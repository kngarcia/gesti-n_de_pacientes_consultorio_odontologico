const { models, sequelize } = require('../models');

const obtenerHistoria = async (idPaciente) => {
  const paciente = await models.Pacientes.findByPk(idPaciente);
  if (!paciente) throw new Error('Paciente no encontrado');

  const [historia] = await models.HistoriaClinica.findOrCreate({
    where: { id_paciente: idPaciente },
    defaults: { id_paciente: idPaciente }
  });

  return historia;
};

const obtenerExamenCompleto = async (idExamen) => {
  return models.ExamenEstomatologico.findOne({
    where: { id_examen_estoma: idExamen },
    include: [
      { model: models.labios, as: 'labios' },
      { model: models.Lengua, as: 'Lenguas' },
      { model: models.PisoDeBoca, as: 'PisoDeBocas' },
      { model: models.Mejillas, as: 'Mejillas' },
      { model: models.Paladar, as: 'Paladars' },
      { model: models.Maxilares, as: 'Maxilares' }
    ]
  });
};

const crearExamen = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    // 1. Obtener historia clínica
    const historia = await obtenerHistoria(req.params.idPaciente);
    
    // 2. Crear examen principal
    const examen = await models.ExamenEstomatologico.create({
      id_historia: historia.id_historia,
      musculos_masticadores: req.body.musculos_masticadores,
      sintomatico: req.body.sintomatico,
      asintomatico: req.body.asintomatico
    }, { transaction });

    // 3. Crear relaciones
    const secciones = {
      labios: models.labios,
      lengua: models.Lengua,
      pisoDeBoca: models.PisoDeBoca,
      mejillas: models.Mejillas,
      paladar: models.Paladar,
      maxilares: models.Maxilares
    };

    for (const [seccionKey, Modelo] of Object.entries(secciones)) {
      const datosSeccion = req.body[seccionKey] || {};
      await Modelo.create({
        id_examen_estoma: examen.id_examen_estoma,
        ...datosSeccion
      }, { transaction });
    }

    // 4. Commit seguro
    await transaction.commit();
    
    // 5. Obtener resultado fuera de la transacción
    try {
      const resultado = await obtenerExamenCompleto(examen.id_examen_estoma);
      res.status(201).json(resultado);
    } catch (error) {
      console.error('Error obteniendo resultado:', error);
      res.status(201).json({ 
        success: true,
        message: 'Examen creado pero error obteniendo detalles'
      });
    }

  } catch (error) {
    // 6. Rollback condicional
    if (!transaction.finished) {
      await transaction.rollback();
    }
    
    res.status(500).json({ 
      error: `Error creando examen: ${error.message}`
    });
    console.error('Error en transacción:', error);
  }
};

const actualizarExamen = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    // 1. Verificar historia clínica
    const historia = await obtenerHistoria(req.params.idPaciente);
    
    // 2. Buscar examen existente
    const examen = await models.ExamenEstomatologico.findOne({
      where: { id_historia: historia.id_historia }
    });
    
    if (!examen) {
      throw new Error('No existe un examen registrado para este paciente');
    }

    // 3. Actualizar datos principales
    await examen.update({
      musculos_masticadores: req.body.musculos_masticadores,
      sintomatico: req.body.sintomatico,
      asintomatico: req.body.asintomatico
    }, { transaction });

    // 4. Actualizar secciones
    const modelos = {
      labios: models.labios,
      lengua: models.Lengua,
      pisodeboca: models.PisoDeBoca,
      mejillas: models.Mejillas,
      paladar: models.Paladar,
      maxilares: models.Maxilares
    };

    for (const [nombreSeccion, modelo] of Object.entries(modelos)) {
      const registro = await modelo.findOne({ 
        where: { id_examen_estoma: examen.id_examen_estoma } 
      });
      
      if (registro) {
        await registro.update(req.body[nombreSeccion.toLowerCase()], { transaction });
      } else {
        await modelo.create({
          id_examen_estoma: examen.id_examen_estoma,
          ...req.body[nombreSeccion.toLowerCase()]
        }, { transaction });
      }
    }

    await transaction.commit();
    const resultado = await obtenerExamenCompleto(examen.id_examen_estoma);
    res.status(200).json(resultado);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ 
      error: `Error actualizando examen: ${error.message}` 
    });
  }
};

const obtenerExamen = async (req, res) => {
  try {
    const historia = await obtenerHistoria(req.params.idPaciente);

    // Traemos el examen con todas las secciones
    const examen = await models.ExamenEstomatologico.findOne({
      where: { id_historia: historia.id_historia },
      include: [
        { model: models.labios,     as: 'labios'     },
        { model: models.Lengua,     as: 'Lenguas'     },
        { model: models.PisoDeBoca, as: 'PisoDeBocas' },
        { model: models.Mejillas,   as: 'Mejillas'   },
        { model: models.Paladar,    as: 'Paladars'    },
        { model: models.Maxilares,  as: 'Maxilares'  }
      ]
    });

    if (!examen) return res.status(404).json(null);

    // Normalizar la respuesta para el front-end: tomar el primer elemento de cada array y renombrar claves
    const data = examen.toJSON();
    const normalized = {
      ...data,
      labios:     Array.isArray(data.labios)     ? data.labios[0]     : data.labios,
      lengua:     Array.isArray(data.Lengua)     ? data.Lengua[0]     : data.Lengua,
      pisoDeBoca: Array.isArray(data.PisoDeBoca) ? data.PisoDeBoca[0] : data.PisoDeBoca,
      mejillas:   Array.isArray(data.Mejillas)   ? data.Mejillas[0]   : data.Mejillas,
      paladar:    Array.isArray(data.Paladar)    ? data.Paladar[0]    : data.Paladar,
      maxilares:  Array.isArray(data.Maxilares)  ? data.Maxilares[0]  : data.Maxilares,
    };

    // Eliminamos las propiedades con alias originales para evitar duplicados
    delete normalized.Lengua;
    delete normalized.PisoDeBoca;
    delete normalized.Mejillas;
    delete normalized.Paladar;
    delete normalized.Maxilares;

    res.status(200).json(normalized);
  } catch (error) {
    console.error('Error obteniendo examen:', error);
    res.status(500).json({ error: `Error obteniendo examen: ${error.message}` });
  }
};


module.exports = {
  crearExamen,
  actualizarExamen,
  obtenerExamen
};
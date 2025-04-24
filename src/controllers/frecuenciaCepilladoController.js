const { models } = require('../models');

// Crea un registro de FrecuenciaCepillado (si no existe)
const crearFrecuenciaCepillado = async (req, res) => {
  try {
    const { patientId } = req.params;
    const historia = await models.HistoriaClinica.findOne({
      where: { id_paciente: patientId }
    });
    if (!historia) {
      return res.status(404).json({ error: 'Historia clínica no encontrada' });
    }
    // Evitar duplicados
    const registroExistente = await models.FrecuenciaCepillado.findOne({
      where: { id_historia: historia.id_historia }
    });
    if (registroExistente) {
      return res.status(409).json({ error: 'El registro de FrecuenciaCepillado ya existe' });
    }
    const nuevoRegistro = await models.FrecuenciaCepillado.create({
      id_historia: historia.id_historia,
      cepillado_veces_dia: req.body.cepillado_veces_dia || '0',
      ceda_detal_veces_al_dia: req.body.ceda_detal_veces_al_dia || '0',
      ultima_visita_odontologo: req.body.ultima_visita_odontologo || null,
      observaciones: req.body.observaciones || null
    });
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error('Error en crearFrecuenciaCepillado:', error);
    res.status(500).json({
      error: 'Error interno del servidor al crear el registro',
      detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Obtiene el registro de FrecuenciaCepillado para el paciente
const obtenerFrecuenciaCepillado = async (req, res) => {
  try {
    const { patientId } = req.params;
    const historia = await models.HistoriaClinica.findOne({
      where: { id_paciente: patientId },
      include: [{
        model: models.FrecuenciaCepillado,
        as: 'FrecuenciaCepillados', // Asegúrate de que el alias coincide con la relación en el modelo
        required: false
      }]
    });
    if (!historia) {
      return res.status(404).json({ error: 'Historia clínica no encontrada' });
    }
    if (!historia.FrecuenciaCepillados) {
      return res.status(404).json({ error: 'Registro de FrecuenciaCepillado no encontrado' });
    }
    res.json(historia.FrecuenciaCepillados);
  } catch (error) {
    console.error('Error en obtenerFrecuenciaCepillado:', error);
    res.status(500).json({
      error: 'Error interno del servidor al obtener el registro',
      detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Guarda (actualiza o inserta) el registro
const guardarFrecuenciaCepillado = async (req, res) => {
  try {
    const { patientId } = req.params;
    const historia = await models.HistoriaClinica.findOne({
      where: { id_paciente: patientId }
    });
    if (!historia) {
      return res.status(404).json({ error: 'Historia clínica no encontrada' });
    }
    // Upsert: Si el registro existe, se actualiza; si no, se crea.
    const [registro, created] = await models.FrecuenciaCepillado.upsert({
      id_historia: historia.id_historia,
      ...req.body
    }, {
      returning: true,
      conflictFields: ['id_historia']
    });
    res.json(registro);
  } catch (error) {
    console.error('Error en guardarFrecuenciaCepillado:', error);
    res.status(500).json({
      error: 'Error al guardar los datos',
      detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  crearFrecuenciaCepillado,
  obtenerFrecuenciaCepillado,
  guardarFrecuenciaCepillado
};

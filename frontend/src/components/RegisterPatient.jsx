import { useState, useEffect } from "react";

const RegisterPatient = ({ onBack }) => {
  const [formData, setFormData] = useState({
    id_doctora: "",
    nombre_completo: "",
    documento_identidad: "",
    edad: "",
    telefono: "",
    direccion: "",
    fecha_nacimiento: "",
    genero: "",
    estado_civil: "",
    nombre_acompanante: "",
    telefono_acompanante: "",
    nombre_responsable: "",
    parentesco_responsable: "",
    telefono_responsable: "",
    eps: "",
    cotizante: "No",
    beneficiario: "No",
    origen_enfermedad: "",
    motivo_consulta: ""
  });

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  // Cargar la lista de usuarios (doctores) al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/usuarios", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Error al cargar usuarios doctores");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error al cambiar
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      'id_doctora', 
      'nombre_completo', 
      'documento_identidad', 
      'edad', 
      'telefono', 
      'eps', 
      'origen_enfermedad',
    ];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = "Este campo es requerido";
      }
    });

    if (formData.edad && (isNaN(formData.edad) || formData.edad < 0 || formData.edad > 120)) {
      errors.edad = "Edad no válida";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No hay token de autenticación, inicia sesión.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Paciente registrado con éxito");
        // Limpiar formulario
        setFormData({
          id_doctora: "",
          nombre_completo: "",
          documento_identidad: "",
          edad: "",
          telefono: "",
          direccion: "",
          fecha_nacimiento: "",
          genero: "",
          estado_civil: "",
          nombre_acompanante: "",
          telefono_acompanante: "",
          nombre_responsable: "",
          parentesco_responsable: "",
          telefono_responsable: "",
          eps: "",
          cotizante: "No",
          beneficiario: "No",
          origen_enfermedad: "",
          motivo_consulta: ""
        });
        onBack();
      } else {
        const errorData = await response.json();
        console.error("Error en la respuesta del servidor:", errorData);
        alert(errorData.mensaje || "Error al registrar paciente");
      }
    } catch (error) {
      console.error("Error al registrar paciente:", error);
      alert("Ocurrió un error al conectar con el servidor.");
    }
  };

  const handleRadioChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
      ...(field === 'cotizante' && { beneficiario: value === "Si" ? "No" : formData.beneficiario }),
      ...(field === 'beneficiario' && { cotizante: value === "Si" ? "No" : formData.cotizante })
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Registrar Nuevo Paciente</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo Doctor Responsable */}
        <div className="md:col-span-2">
          <label className="block text-gray-600 font-medium mb-1">Doctor Responsable *</label>
          {loadingUsers ? (
            <div className="animate-pulse p-3 bg-gray-100 rounded">Cargando lista de doctores...</div>
          ) : users.length === 0 ? (
            <p className="text-red-500">No hay doctores disponibles en el sistema</p>
          ) : (
            <>
              <select
                name="id_doctora"
                value={formData.id_doctora}
                onChange={handleChange}
                className={`w-full p-2 border rounded mt-1 ${formErrors.id_doctora ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Seleccione un doctor</option>
                {users.map(user => (
                  <option key={user.id_usuario} value={user.id_usuario}>
                    {user.nombre}
                  </option>
                ))}
              </select>
              {formErrors.id_doctora && (
                <p className="text-red-500 text-sm mt-1">{formErrors.id_doctora}</p>
              )}
            </>
          )}
        </div>

        {/* Información Básica */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Nombre Completo *</label>
          <input
            type="text"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            className={`w-full p-2 border rounded mt-1 ${formErrors.nombre_completo ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formErrors.nombre_completo && (
            <p className="text-red-500 text-sm mt-1">{formErrors.nombre_completo}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Documento de Identidad *</label>
          <input
            type="text"
            name="documento_identidad"
            value={formData.documento_identidad}
            onChange={handleChange}
            className={`w-full p-2 border rounded mt-1 ${formErrors.documento_identidad ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formErrors.documento_identidad && (
            <p className="text-red-500 text-sm mt-1">{formErrors.documento_identidad}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Edad *</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            min="0"
            max="120"
            className={`w-full p-2 border rounded mt-1 ${formErrors.edad ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formErrors.edad && (
            <p className="text-red-500 text-sm mt-1">{formErrors.edad}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Teléfono *</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={`w-full p-2 border rounded mt-1 ${formErrors.telefono ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formErrors.telefono && (
            <p className="text-red-500 text-sm mt-1">{formErrors.telefono}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Fecha de Nacimiento</label>
          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Género</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Estado Civil</label>
          <select
            name="estado_civil"
            value={formData.estado_civil}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Seleccione</option>
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Viudo">Viudo</option>
            <option value="Unión Libre">Unión Libre</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Nombre Acompañante</label>
          <input
            type="text"
            name="nombre_acompanante"
            value={formData.nombre_acompanante}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Teléfono Acompañante</label>
          <input
            type="tel"
            name="telefono_acompanante"
            value={formData.telefono_acompanante}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Nombre Responsable</label>
          <input
            type="text"
            name="nombre_responsable"
            value={formData.nombre_responsable}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Parentesco Responsable</label>
          <input
            type="text"
            name="parentesco_responsable"
            value={formData.parentesco_responsable}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Teléfono Responsable</label>
          <input
            type="tel"
            name="telefono_responsable"
            value={formData.telefono_responsable}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">EPS *</label>
          <input
            type="text"
            name="eps"
            value={formData.eps}
            onChange={handleChange}
            className={`w-full p-2 border rounded mt-1 ${formErrors.eps ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formErrors.eps && (
            <p className="text-red-500 text-sm mt-1">{formErrors.eps}</p>
          )}
        </div>

        {/* Tipo de Afiliación */}
        <div className="space-y-2">
          <p className="text-gray-600 font-medium mb-1">Tipo de Afiliación</p>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="cotizante"
                checked={formData.cotizante === "Si"}
                onChange={() => handleRadioChange('cotizante', 'Si')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span>Cotizante</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="beneficiario"
                checked={formData.beneficiario === "Si"}
                onChange={() => handleRadioChange('beneficiario', 'Si')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span>Beneficiario</span>
            </label>
          </div>
          {(formErrors.cotizante || formErrors.beneficiario) && (
            <p className="text-red-500 text-sm mt-1">Debe seleccionar un tipo de afiliación</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-600 font-medium mb-1">Origen de Enfermedad *</label>
          <select
            name="origen_enfermedad"
            value={formData.origen_enfermedad}
            onChange={handleChange}
            className={`w-full p-2 border rounded mt-1 ${formErrors.origen_enfermedad ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Seleccione</option>
            <option value="Paciente sano">Paciente sano</option>
            <option value="Enfermedad general o común">Enfermedad general o común</option>
            <option value="Enfermedad profesional o ocupacional">Enfermedad profesional o ocupacional</option>
            <option value="Accidente de trabajo">Accidente de trabajo</option>
            <option value="Accidente no de trabajo o fuera del trabajo">Accidente no de trabajo o fuera del trabajo</option>
          </select>
          {formErrors.origen_enfermedad && (
            <p className="text-red-500 text-sm mt-1">{formErrors.origen_enfermedad}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-600 font-medium mb-1">Motivo de Consulta *</label>
          <textarea
            name="motivo_consulta"
            value={formData.motivo_consulta}
            onChange={handleChange}
            rows={4}
            className={`w-full p-2 border rounded mt-1 ${formErrors.motivo_consulta ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formErrors.motivo_consulta && (
            <p className="text-red-500 text-sm mt-1">{formErrors.motivo_consulta}</p>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition"
          >
            Registrar Paciente
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPatient;
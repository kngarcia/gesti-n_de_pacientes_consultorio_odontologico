import { useState } from "react";

const RegisterPatient = ({ onBack }) => {
  const [formData, setFormData] = useState({
    id_doctora: "",
    nombre_completo: "",
    documento_identidad: "",
    edad: "",
    telefono: "",
    direccion: "", // Campo opcional agregado
    fecha_nacimiento: "", // Campo opcional agregado
    genero: "", // Campo opcional agregado
    estado_civil: "", // Campo opcional agregado
    eps: "",
    cotizante: "No", // Campo opcional agregado
    beneficiario: "No", // Campo opcional agregado
    origen_enfermedad: "",
    motivo_consulta: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Intentando registrar paciente...", formData); // Debug

    // Obtén el token desde localStorage o sessionStorage
    const token = localStorage.getItem("token"); // Asegúrate de que este valor se almacena al iniciar sesión

    if (!token) {
      alert("No hay token de autenticación, inicia sesión.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Incluye el token aquí
        },
        body: JSON.stringify(formData)
      });

      console.log("Respuesta del servidor:", response);

      if (response.ok) {
        alert("Paciente registrado con éxito");
        setFormData({
          id_doctora: "",
          nombre_completo: "",
          documento_identidad: "",
          edad: "",
          telefono: "",
          direccion: "", // Campo opcional agregado
          fecha_nacimiento: "", // Campo opcional agregado
          genero: "", // Campo opcional agregado
          estado_civil: "", // Campo opcional agregado
          eps: "",
          cotizante: "", // Campo opcional agregado
          beneficiario: "", // Campo opcional agregado
          origen_enfermedad: "",
          motivo_consulta: ""
        });

        // Limpia el formulario y vuelve al dashboard
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

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Registrar Paciente</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600">ID Doctora</label>
          <input type="number" name="id_doctora" value={formData.id_doctora} onChange={handleChange} required
            className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
          <label className="block text-gray-600">Nombre Completo</label>
          <input type="text" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} required
            className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
          <label className="block text-gray-600">Documento Identidad</label>
          <input type="text" name="documento_identidad" value={formData.documento_identidad} onChange={handleChange} required
            className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
          <label className="block text-gray-600">Edad</label>
          <input type="number" name="edad" value={formData.edad} onChange={handleChange} required
            className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
          <label className="block text-gray-600">Teléfono</label>
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required
            className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
          <label className="block text-gray-600">Dirección</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
          <label className="block text-gray-600">Fecha de Nacimiento</label>
          <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
          <label className="block text-gray-600">Género</label>
          <select name="genero" value={formData.genero} onChange={handleChange} required
            className="w-full p-2 border border-gray-300 rounded mt-1">
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600">Estado Civil</label>
          <input type="text" name="estado_civil" value={formData.estado_civil} onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>

        <div>
          <label className="block text-gray-600">EPS</label>
          <input type="text" name="eps" value={formData.eps} onChange={handleChange} required
            className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">Tipo de Afiliación</p>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="tipo_afiliacion"
                value="cotizante"
                checked={formData.cotizante === "Si"}
                onChange={() => setFormData({
                  ...formData,
                  cotizante: "Si",
                  beneficiario: "No"
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span>Cotizante</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="tipo_afiliacion"
                value="beneficiario"
                checked={formData.beneficiario === "Si"}
                onChange={() => setFormData({
                  ...formData,
                  cotizante: "No",
                  beneficiario: "Si"
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span>Beneficiario</span>
            </label>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-600">Origen de Enfermedad</label>
          <select name="origen_enfermedad" value={formData.origen_enfermedad} onChange={handleChange} required
            className="w-full p-2 border border-gray-300 rounded mt-1">
            <option value="">Seleccione</option>
            <option value="Paciente sano">Paciente sano</option>
            <option value="Enfermedad general o común">Enfermedad general o común</option>
            <option value="Enfermedad profesional o ocupacional">Enfermedad profesional o ocupacional</option>
            <option value="Accidente de trabajo">Accidente de trabajo</option>
            <option value="Accidente no de trabajo o fuera del trabajo">Accidente no de trabajo o fuera del trabajo</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-600">Motivo de Consulta</label>
          <textarea name="motivo_consulta" value={formData.motivo_consulta} onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"></textarea>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPatient;
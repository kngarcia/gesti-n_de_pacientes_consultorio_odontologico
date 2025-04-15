import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("❌ Credenciales incorrectas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-300 to-white p-4 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/src/assets/logo-agua.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "100px",
          backgroundPosition: "center",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      ></div>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Iniciar Sesión
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2 animate-fadeIn">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-gray-700 font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full p-3 mt-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              placeholder="correo@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full p-3 mt-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 0116 0H4z"
                ></path>
              </svg>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

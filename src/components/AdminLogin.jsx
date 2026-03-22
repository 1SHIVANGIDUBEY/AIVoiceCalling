import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/auth";   // ← add this import

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");          // ← add error state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {             // ← make async
    e.preventDefault();
    setError("");

    const data = await login(form.username, form.password);

    if (data.message === 'Logged in successfully') {
      navigate("/dashboard");
    } else {
      setError(data.message || "Login failed");   // show error to user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-0"></div>
      <div className="relative z-10 w-full max-w-md p-10 rounded-2xl border-2 border-purple-500 shadow-2xl bg-black">
        <h1 className="text-3xl font-bold text-center text-purple-400 mb-6">Admin Login</h1>

        {error && (                               
          <p className="text-red-400 text-center mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              name="username"
              type="text"
              required
              onChange={handleChange}
              className="peer w-full p-3 border-b-2 border-purple-500 bg-transparent text-white focus:outline-none focus:border-purple-400"
            />
            <label className="absolute left-3 top-3 text-gray-400 text-sm peer-focus:-top-2 peer-focus:text-purple-400 peer-focus:text-sm transition-all">
              Username
            </label>
          </div>
          <div className="relative">
            <input
              name="password"
              type="password"
              required
              onChange={handleChange}
              className="peer w-full p-3 border-b-2 border-purple-500 bg-transparent text-white focus:outline-none focus:border-purple-400"
            />
            <label className="absolute left-3 top-3 text-gray-400 text-sm peer-focus:-top-2 peer-focus:text-purple-400 peer-focus:text-sm transition-all">
              Password
            </label>
          </div>
          <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-shadow shadow-lg hover:shadow-purple-500/50">
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
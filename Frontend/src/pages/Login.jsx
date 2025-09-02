import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://expense-tracker-xtme.onrender.com/api/user/login", form);
      setMessage(data.message);
      if (data.token) localStorage.setItem("token", data.token);
      navigate('/dashboard')
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-sm bg-white  shadow-xl p-8">
      <h2 className="text-3xl font-extrabold text-center text-black mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 border font-bold  border-gray-300  "
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-3 border border-gray-300 font-bold  "
          required
        />
        <button className="bg-black text-white py-3 rounded-lg">
          Login
        </button>
      </form>
      {message && <p className="text-center text-sm text-gray-600 mt-3">{message}</p>}
      <p className="text-center text-sm mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

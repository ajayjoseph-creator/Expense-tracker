import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
const navigate=useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://expense-tracker-xtme.onrender.com/api/user/register", form);
      setMessage(data.message);
      toast.success('registered successfully')
 navigate('/')
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      toast.error('failed')
    }
  };

  return (
    <div className="w-full max-w-sm bg-white  shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center text-black mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="p-3 border font-bold border-gray-300 rounded-lg focus:outline-none  focus:ring-black"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 border font-bold border-gray-300 rounded-lg focus:outline-none  focus:ring-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-3 border font-extrabold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button className="bg-black text-white py-3 rounded-lg  transition">
          Register
        </button>
      </form>
      {message && <p className="text-center text-sm text-gray-600 mt-3">{message}</p>}
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link to="/" className="text-black hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

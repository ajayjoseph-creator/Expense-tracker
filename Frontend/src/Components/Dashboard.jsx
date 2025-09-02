import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
  });
  const [summary, setSummary] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get(
        "http://localhost:3002/api/expenses/getexpense",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenses(data);
    } catch (err) {
      console.log("Fetch Expenses Error:", err.response?.data || err.message);
    }
  };

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get(
        "http://localhost:3002/api/expenses/summary",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSummary(data);
    } catch (err) {
      console.log("Fetch Summary Error:", err.response?.data || err.message);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.warning("Please login first");

      await axios.post(
        "http://localhost:3002/api/expenses/addexpense",
        form,
        getAuthHeaders()
      );
      setForm({ amount: "", category: "", description: "" });
      fetchExpenses();
      fetchSummary();
    } catch (err) {
      console.log("Add Expense Error:", err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <button
          onClick={handleLogout}
          className="bg-red-900 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <div className="flex gap-8">
        <div className=" bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
          <form className="flex flex-col gap-3" onSubmit={addExpense}>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="p-2 border "
              required
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="p-2 border "
              required
            >
              <option value="">Select Category</option>
              <option value="food">food</option>
              <option value="travel">travel</option>
              <option value="shopping">shopping</option>
              <option value="bills">bills</option>
              <option value="education">education</option>
              <option value="Others">Others</option>
            </select>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="p-2 border "
            />
            <button className="bg-black text-white py-2 rounded">Add</button>
          </form>
        </div>

        <div className=" border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Expense Chart</h2>
          {summary.length > 0 ? (
            <Bar
              data={{
                labels: summary.map((s) => s._id),
                datasets: [
                  {
                    label: "Amount Spent",
                    data: summary.map((s) => s.total),
                    backgroundColor: "blue",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
              height={200}
            />
          ) : (
            <p className="text-gray-500">No data yet</p>
          )}
        </div>
        <div className="">
          <h2 className="text-2xl font-semibold mb-4">Expenses details</h2>

          {expenses.length > 0 ? (
            <ul className="space-y-3">
              {expenses.map((exp) => (
                <li
                  key={exp._id}
                  className="p-3 border rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{exp.category}</p>
                    <p className="text-gray-600 text-sm">{exp.description}</p>
                  </div>
                  <span className="font-semibold text-blue-600">
                    ₹{exp.amount}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No expenses yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

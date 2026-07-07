import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    phone: "",
    location: "",
    shopName: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "vendor") navigate("/vendor-dashboard");
      else navigate("/customer-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" className="w-full border p-3 rounded-lg" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="w-full border p-3 rounded-lg" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="w-full border p-3 rounded-lg" onChange={handleChange} required />

        <select name="role" className="w-full border p-3 rounded-lg" onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>

        <input name="phone" placeholder="Phone" className="w-full border p-3 rounded-lg" onChange={handleChange} />
        <input name="location" placeholder="Location" className="w-full border p-3 rounded-lg" onChange={handleChange} />

        {form.role === "vendor" && (
          <input name="shopName" placeholder="Shop Name" className="w-full border p-3 rounded-lg" onChange={handleChange} />
        )}

        <button className="w-full bg-green-600 text-white py-3 rounded-lg">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
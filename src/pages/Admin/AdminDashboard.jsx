import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    vendors: 0,
    products: 0,
    orders: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-bold text-xl">Users</h2>
          <p className="text-5xl mt-4">{stats.users}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-bold text-xl">Vendors</h2>
          <p className="text-5xl mt-4">{stats.vendors}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-bold text-xl">Products</h2>
          <p className="text-5xl mt-4">{stats.products}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-bold text-xl">Orders</h2>
          <p className="text-5xl mt-4">{stats.orders}</p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
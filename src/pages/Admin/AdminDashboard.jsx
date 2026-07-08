import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchAll = async () => {
    try {
      const statsRes = await api.get("/admin/stats", config);
      const usersRes = await api.get("/admin/users", config);
      const productsRes = await api.get("/admin/products", config);
      const ordersRes = await api.get("/admin/orders", config);

      setStats(statsRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      alert(err.response?.data?.message || "Admin data failed");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    await api.delete(`/products/${id}`, config);
    alert("Product deleted");
    fetchAll();
  };

  const approveVendor = async (id) => {
    await api.put(`/admin/vendors/${id}/approve`, {}, config);
    alert("Vendor approved");
    fetchAll();
  };

  const blockUser = async (id) => {
    await api.put(`/admin/vendor/${id}`, {}, config);
    alert("User status updated");
    fetchAll();
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-5 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-bold">Users</h2>
          <p className="text-4xl mt-3">{stats.totalUsers || stats.users || 0}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-bold">Vendors</h2>
          <p className="text-4xl mt-3">{stats.totalVendors || stats.vendors || 0}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-bold">Products</h2>
          <p className="text-4xl mt-3">{stats.totalProducts || stats.products || 0}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-bold">Orders</h2>
          <p className="text-4xl mt-3">{stats.totalOrders || stats.orders || 0}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-bold">Sales</h2>
          <p className="text-3xl mt-3">₹{stats.totalSales || 0}</p>
        </div>
      </div>

      <section className="bg-white shadow rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold mb-5">Manage Users & Vendors</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Approved</th>
                <th className="p-3 border">Blocked</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.role}</td>
                  <td className="p-3 border">{user.isApproved ? "Yes" : "No"}</td>
                  <td className="p-3 border">{user.isBlocked ? "Yes" : "No"}</td>
                  <td className="p-3 border flex gap-2">
                    {user.role === "vendor" && !user.isApproved && (
                      <button
                        onClick={() => approveVendor(user._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}

                    {user.role !== "admin" && (
                      <button
                        onClick={() => blockUser(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white shadow rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold mb-5">Manage Products</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-xl p-4">
              <img
                src={product.images?.[0]}
                className="h-40 w-full object-cover rounded-lg"
              />

              <h3 className="font-bold mt-3">{product.name}</h3>
              <p>₹{product.price}</p>
              <p className="text-sm text-gray-500">{product.category}</p>

              <button
                onClick={() => deleteProduct(product._id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-5">All Orders</h2>

        {orders.map((order) => (
          <div key={order._id} className="border rounded-xl p-4 mb-4">
            <p className="font-bold">Order ID: {order._id}</p>
            <p>Customer: {order.customer?.name || "Unknown"}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Status: {order.orderStatus}</p>
            <p>Payment: {order.paymentMethod}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminDashboard;
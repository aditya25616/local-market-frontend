import { useEffect, useState } from "react";
import api from "../../services/api";

function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: [""],
    location: "",
  });

  const token = localStorage.getItem("token");

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      images: [""],
      location: "",
    });
  };

  const fetchProducts = async () => {
    const res = await api.get("/vendor/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await api.get("/vendor/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, images: [e.target.value] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Product updated");
      } else {
        await api.post("/products", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Product added");
      }

      await fetchProducts();
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      category: product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      images: product.images?.length ? product.images : [""],
      location: product.location || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id) => {
    try {
      if (!confirm("Delete this product?")) return;

      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product deleted");
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">Vendor Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold">Products</h2>
          <p className="text-4xl mt-3">{products.length}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold">Orders</h2>
            <p className="text-4xl mt-3">{orders.length}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold">Revenue</h2>
            <p className="text-4xl mt-3">
              ₹{orders.reduce((sum, order) => sum + (order.vendorTotal || 0), 0)}
            </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6 mb-10">
        <h2 className="text-3xl font-bold mb-6">
          {editingId ? "Update Product" : "Add Product"}
        </h2>

        <form onSubmit={saveProduct} className="grid md:grid-cols-2 gap-4">
          <input name="name" placeholder="Product Name" className="border p-3 rounded-lg" onChange={handleChange} value={form.name} required />
          <input name="category" placeholder="Category" className="border p-3 rounded-lg" onChange={handleChange} value={form.category} required />
          <input name="price" placeholder="Price" className="border p-3 rounded-lg" onChange={handleChange} value={form.price} required />
          <input name="stock" placeholder="Stock" className="border p-3 rounded-lg" onChange={handleChange} value={form.stock} required />
          <input name="location" placeholder="Location" className="border p-3 rounded-lg" onChange={handleChange} value={form.location} />
          <input name="image" placeholder="Image URL" className="border p-3 rounded-lg" onChange={handleChange} value={form.images[0]} />

          <textarea
            name="description"
            placeholder="Description"
            className="border p-3 rounded-lg md:col-span-2"
            onChange={handleChange}
            value={form.description}
            required
          />

          <button className="bg-green-600 text-white rounded-lg py-3 md:col-span-2">
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-600 text-white rounded-lg py-3 md:col-span-2"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div className="bg-white shadow rounded-xl p-6 mb-10">
        <h2 className="text-3xl font-bold mb-6">Recent Orders</h2>

        {orders.length === 0 && <p>No orders yet.</p>}

        {orders.map((order) => (
          <div key={order._id} className="border-b py-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">{order.customer?.name || 'Unknown'}</div>
                <div className="text-sm text-gray-600">{order.customer?.email}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹{order.vendorTotal}</div>
                <div className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="font-semibold">Items:</div>
              <ul className="list-disc list-inside">
                {order.orderItems.map((item) => (
                  <li key={item._id}>
                    {item.name || item.product?.name} x {item.quantity} - ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-5">My Products</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow rounded-xl p-4">
            <img
              src={product.images?.[0]}
              className="h-48 w-full object-cover rounded-lg"
            />

            <h2 className="font-bold mt-4">{product.name}</h2>
            <p>₹{product.price}</p>
            <p>Stock: {product.stock}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => editProduct(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VendorDashboard;
import { useEffect, useState } from "react";
import api from "../../services/api";

function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/vendor/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/vendor/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Vendor Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-10">

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
            ₹
            {orders.reduce(
              (sum, order) => sum + order.totalAmount,
              0
            )}
          </p>
        </div>

      </div>

      <h2 className="text-3xl font-bold mb-5">
        My Products
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow rounded-xl p-4"
          >
            <img
              src={product.images[0]}
              className="h-48 w-full object-cover rounded-lg"
            />

            <h2 className="font-bold mt-4">
              {product.name}
            </h2>

            <p>₹{product.price}</p>

            <p>Stock : {product.stock}</p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default VendorDashboard;
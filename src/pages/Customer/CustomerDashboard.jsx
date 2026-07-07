import { useEffect, useState } from "react";
import api from "../../services/api";

function CustomerDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(console.log);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white shadow rounded-xl p-5 mb-5">
            <h2 className="font-bold">Order ID: {order._id}</h2>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Status: {order.orderStatus}</p>
            <p>Payment: {order.paymentMethod}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerDashboard;
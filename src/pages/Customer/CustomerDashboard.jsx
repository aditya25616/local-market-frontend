import { useEffect, useState } from "react";
import api from "../../services/api";

function CustomerDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/orders/my", {
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
            <div className="mt-3">
              <div className="font-semibold">Estimated delivery:</div>
              <div className="text-sm text-gray-600">
                {order.estimatedDeliveryFrom && order.estimatedDeliveryTo
                  ? `${new Date(order.estimatedDeliveryFrom).toLocaleDateString()} - ${new Date(order.estimatedDeliveryTo).toLocaleDateString()}`
                  : "3-5 business days"}
              </div>
            </div>

            <div className="mt-3">
              <div className="font-semibold">Items:</div>
              <ul className="list-disc list-inside">
                {order.items?.map((item) => (
                  <li key={item.product || item._id}>
                    {item.name || item.product?.name} x {item.quantity} - ₹{item.price}
                    <div className="text-sm text-gray-600">Vendor: {item.vendor?.name || item.vendorName || 'Unknown'}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerDashboard;
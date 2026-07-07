import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/orders",
        { deliveryAddress: address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully");
      navigate("/customer-dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <div className="bg-white shadow rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <p className="mb-6 text-green-600 font-semibold">
          Payment Method: Cash on Delivery
        </p>

        <form onSubmit={placeOrder} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            name="address"
            placeholder="Address"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            name="pincode"
            placeholder="Pincode"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-green-600 text-white py-3 rounded-lg">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
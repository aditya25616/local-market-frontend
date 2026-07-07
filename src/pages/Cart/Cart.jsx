import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Cart() {
  const [cart, setCart] = useState({ items: [] });

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    const res = await api.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart().catch(() => setCart({ items: [] }));
  }, []);

  const updateQty = async (productId, quantity) => {
    await api.put(
      `/cart/${productId}`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCart();
  };

  const removeItem = async (productId) => {
    await api.delete(`/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">My Cart</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between items-center bg-white shadow rounded-xl p-5 mb-5"
            >
              <div className="flex gap-5">
                <img
                  src={item.product.images[0]}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div>
                  <h2 className="font-bold text-xl">{item.product.name}</h2>
                  <p>₹{item.product.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(item.product._id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => updateQty(item.product._id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-red-600 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-xl">
                ₹{item.product.price * item.quantity}
              </h2>
            </div>
          ))}

          <div className="bg-white shadow rounded-xl p-6 text-right">
            <h2 className="text-2xl font-bold">Total: ₹{total}</h2>

            <Link
              to="/checkout"
              className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
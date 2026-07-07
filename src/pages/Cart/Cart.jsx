import { useEffect, useState } from "react";
import api from "../../services/api";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCart(res.data))
      .catch(console.log);
  }, []);

  if (!cart)
    return <h2 className="text-center mt-20 text-2xl">Loading...</h2>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">My Cart</h1>

      {cart.items.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        cart.items.map((item) => (
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
                <h2 className="font-bold text-xl">
                  {item.product.name}
                </h2>

                <p>₹{item.product.price}</p>

                <p>Quantity : {item.quantity}</p>
              </div>
            </div>

            <h2 className="font-bold text-xl">
              ₹{item.product.price * item.quantity}
            </h2>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
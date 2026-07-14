import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../../services/wishlistService";

function Wishlist() {
  const [items, setItems] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();
      setItems(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      fetchWishlist();
    } catch (err) {
      alert(err.response?.data?.message || "Remove failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">My Wishlist ❤️</h1>

      {items.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-10 text-center">
          <p className="text-xl mb-4">Your wishlist is empty.</p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-xl p-4">
              <img
                src={item.product.images?.[0]}
                alt={item.product.name}
                className="h-48 w-full object-cover rounded-lg"
              />

              <h2 className="font-bold text-xl mt-4">{item.product.name}</h2>
              <p className="text-gray-500">{item.product.category}</p>
              <p className="text-green-600 font-bold text-xl mt-2">
                ₹{item.product.price}
              </p>

              <Link
                to={`/products/${item.product._id}`}
                className="block text-center bg-green-600 text-white py-2 rounded-lg mt-4"
              >
                View
              </Link>

              <button
                onClick={() => handleRemove(item.product._id)}
                className="w-full bg-red-600 text-white py-2 rounded-lg mt-3"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
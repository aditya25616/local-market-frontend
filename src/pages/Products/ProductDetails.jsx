import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { addToWishlist } from "../../services/wishlistService";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/cart",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleWishlist = async () => {
    try {
      await addToWishlist(product._id);
      alert("Product added to wishlist");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to wishlist");
    }
  };

  if (!product) {
    return <p className="p-10 text-xl">Loading product...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-full h-96 object-cover rounded-2xl"
      />

      <div>
        <p className="text-green-600 font-semibold">{product.category}</p>

        <h1 className="text-4xl font-bold mt-3">{product.name}</h1>

        <p className="text-gray-600 mt-5">{product.description}</p>

        <p className="text-3xl font-bold text-green-600 mt-6">
          ₹{product.price}
        </p>

        <p className="mt-3 text-gray-500">Stock: {product.stock}</p>
        <p className="text-gray-500">Location: {product.location}</p>
        <p className="text-gray-500">Vendor: {product.vendorName}</p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
          >
            Add to Cart
          </button>

          <button
            onClick={handleWishlist}
            className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700"
          >
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
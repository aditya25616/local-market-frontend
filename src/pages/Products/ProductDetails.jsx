import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { addToCart } from "../../services/cartService";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

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

        <button
  onClick={handleAddToCart}
  className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700">
          Add to Cart
        </button>
      </div>
    </div>
  );

  const handleAddToCart = async () => {
  try {
    await addToCart(product._id);

    alert("Product added to cart!");
  } catch (error) {
    alert("Please login first.");
    console.log(error);
  }
};
}

export default ProductDetails;
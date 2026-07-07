import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      <img
        src={product.images?.[0]}
        alt={product.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">

        <h3 className="font-bold text-xl">
          {product.name}
        </h3>

        <p className="text-gray-500 mt-2">
          {product.category}
        </p>

        <p className="text-sm text-gray-400">
          {product.location}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </span>

          <Link
            to={`/products/${product._id}`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;
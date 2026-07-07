import { useEffect, useState } from "react";
import api from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold">All Products</h1>

      <div className="grid md:grid-cols-4 gap-6 mt-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl shadow p-4">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-48 w-full object-cover rounded-xl"
            />

            <h3 className="font-bold text-lg mt-4">{product.name}</h3>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-green-600 font-bold text-xl mt-3">
              ₹{product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
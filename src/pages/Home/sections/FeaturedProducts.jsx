import { useEffect, useState } from "react";
import api from "../../../services/api";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data.slice(0, 4)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center">Featured Products</h2>
        <p className="text-center text-gray-500 mt-3">
          Fresh and popular items from local sellers.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-12">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow p-4">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-48 w-full object-cover rounded-xl"
              />

              <h3 className="font-bold text-lg mt-4">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 font-bold text-xl">
                  ₹{product.price}
                </span>

                <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;

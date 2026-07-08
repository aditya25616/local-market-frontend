import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let data = [...products];

    if (search) {
      data = data.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter((product) => product.category === category);
    }

    setFilteredProducts(data);
  }, [search, category, products]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Products
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 flex-1"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-3"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        {filteredProducts.map((product) => (

          <div
            key={product._id}
            className="bg-white rounded-xl shadow p-4"
          >

            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-48 w-full object-cover rounded-lg"
            />

            <h2 className="font-bold text-xl mt-4">
              {product.name}
            </h2>

            <p className="text-gray-500">
              {product.category}
            </p>

            <p className="text-green-600 font-bold text-xl mt-2">
              ₹{product.price}
            </p>

            <Link
              to={`/products/${product._id}`}
              className="block text-center bg-green-600 text-white rounded-lg py-2 mt-4"
            >
              View Details
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Products;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");

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

    if (location) {
      data = data.filter((product) =>
        product.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (maxPrice) {
      data = data.filter((product) => product.price <= Number(maxPrice));
    }

    if (sort === "low-high") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      data.sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(data);
  }, [search, category, location, maxPrice, sort, products]);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
    setFilteredProducts(res.data);
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      <div className="bg-white shadow rounded-xl p-5 mb-8 grid md:grid-cols-5 gap-4">
        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded-lg"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="newest">Newest First</option>
          <option value="low-high">Price Low to High</option>
          <option value="high-low">Price High to Low</option>
        </select>
      </div>

      <p className="mb-5 text-gray-600">
        Showing {filteredProducts.length} products
      </p>

      <div className="grid md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow p-4">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-48 w-full object-cover rounded-lg"
            />

            <h2 className="font-bold text-xl mt-4">{product.name}</h2>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-sm text-gray-500">{product.location}</p>

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
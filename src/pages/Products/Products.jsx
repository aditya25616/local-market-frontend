import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductCard from "../../components/product/ProductCard";

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
            <ProductCard
            key={product._id}
            product={product}
    />
    ))}
      </div>
    </div>
  );
}

export default Products;
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-green-50 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-green-600 font-semibold mb-3">
            Support Local Vendors
          </p>

          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Buy fresh and local products from nearby sellers
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            LocalMarket helps small vendors sell online and customers shop easily from trusted local stores.
          </p>

          <div className="mt-8 flex gap-4">
            <Link to="/products" className="bg-green-600 text-white px-6 py-3 rounded-lg">
              Shop Now
            </Link>

            <Link to="/register" className="border border-green-600 text-green-600 px-6 py-3 rounded-lg">
              Become Vendor
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Local market"
            className="rounded-2xl w-full h-96 object-cover"          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
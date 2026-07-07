import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-green-600">
        LocalMarket
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/products" className="hover:text-green-600">Products</Link>
        <Link to="/cart" className="hover:text-green-600">Cart</Link>
        <Link to="/login" className="hover:text-green-600">Login</Link>
        <Link
          to="/register"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
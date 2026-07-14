import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const dashboardLink =
    user?.role === "admin"
      ? "/admin-dashboard"
      : user?.role === "vendor"
      ? "/vendor-dashboard"
      : "/customer-dashboard";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-green-600">
        LocalMarket
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-green-600">
          Home
        </Link>

        <Link to="/products" className="hover:text-green-600">
          Products
        </Link>

        {user?.role === "customer" && (
          <>
            <Link to="/wishlist" className="hover:text-green-600">
              Wishlist ❤️
            </Link>

            <Link to="/cart" className="hover:text-green-600">
              Cart
            </Link>
          </>
        )}

        {token ? (
          <>
            <Link to={dashboardLink} className="hover:text-green-600">
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-600">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/Products/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VendorDashboard from "./pages/Vendor/VendorDashboard";

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="*" element={<h1 className="p-6 text-3xl">404 Not Found</h1>} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
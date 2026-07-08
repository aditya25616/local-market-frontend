import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/Products/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import VendorDashboard from "./pages/Vendor/VendorDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedRoute from "./routes/RoleBasedRoute";

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/cart"
            element={
              <RoleBasedRoute allowedRoles={["customer"]}>
                <Cart />
              </RoleBasedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <RoleBasedRoute allowedRoles={["customer"]}>
                <Checkout />
              </RoleBasedRoute>
            }
          />

          <Route
            path="/customer-dashboard"
            element={
              <RoleBasedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </RoleBasedRoute>
            }
          />

          <Route
            path="/vendor-dashboard"
            element={
              <RoleBasedRoute allowedRoles={["vendor"]}>
                <VendorDashboard />
              </RoleBasedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoute>
            }
          />

          <Route
            path="*"
            element={
              <div className="p-10 text-4xl font-bold">
                404 Not Found
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
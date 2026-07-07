import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<h1 className="p-6 text-3xl">Login Page</h1>} />
          <Route path="/register" element={<h1 className="p-6 text-3xl">Register Page</h1>} />
          <Route path="/products" element={<h1 className="p-6 text-3xl">Products Page</h1>} />
          <Route path="/cart" element={<h1 className="p-6 text-3xl">Cart Page</h1>} />
          <Route path="*" element={<h1 className="p-6 text-3xl">404 Not Found</h1>} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
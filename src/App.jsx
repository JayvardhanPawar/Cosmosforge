import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import About from "./pages/About";
import Manufacturing from "./pages/Manufacturing";
import ManufacturingDetail from "./pages/ManufacturingDetail";
import Trading from "./pages/Trading";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";

// Opens each new page at the top (for example after clicking a footer link).
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const NotFound = () => (
  <main style={{ padding: "4rem 5%", minHeight: "50vh" }}>
    <h1>Page not found</h1>
  </main>
);

export default function App() {
  return (
    <>
      <Loader />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/manufacturing/:id" element={<ManufacturingDetail />} />
        <Route path="/trading" element={<Trading />} />
        <Route path="/trading/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
import Auth from "./pages/Auth";
import "./styles/index.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import TemplateDetails from "./components/TemplateDetail";
import Cart from "./pages/Cart";
export default function App() {
  return (
    <>
      <Navbar />
      {/* Laat een component zien op basis van de URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Laat een dynamisch TemplateDetails component zien op basis van de template id in de URL */}
        <Route path="/templates/:id" element={<TemplateDetails />} />
        <Route path="/profile" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to manage the search term

  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if product already exists
    } else {
      storedCart.push({ ...product, quantity: 1 }); // Add new product to cart
    }

    localStorage.setItem("cart", JSON.stringify(storedCart)); // Save updated cart to localStorage
    setCart(storedCart); // Update local state for cart
  };

  const removeFromCart = (productId) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedCart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
    setCart(updatedCart); // Update local state for cart
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term
  };

  return (
    <Router>
      <div>
        <Header onSearch={handleSearch} /> {/* Pass search handler */}
        <Routes>
          <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
          <Route
            path="/product/:id"
            element={<ProductPage addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (productId, increment) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
          if (newQuantity <= 0) {
            return null; // Remove item if quantity is 0 or less
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean); // Remove null values from the array

    updateCart(updatedCart);
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`); // Navigate to the product detail page
  };

  return (
    <div className="container">
      <h1>Your Cart</h1>
      <div className="row">
        {cart.map((item) => (
          <div key={item.id} className="col-md-12 mb-3">
            <div className="d-flex align-items-center border p-3">
              <div className="me-3">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  style={{ width: "100px", height: "auto" }}
                />
              </div>
              <div className="flex-grow-1">
                <h5>{item.title}</h5>
                <p>${item.price}</p>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => handleQuantityChange(item.id, false)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="me-2">{item.quantity}</span>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleQuantityChange(item.id, true)}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-danger ms-2 me-2"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleViewProduct(item.id)}
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
      {cart.length === 0 && <p>Your cart is empty.</p>}
    </div>
  );
};

export default CartPage;

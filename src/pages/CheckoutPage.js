import React, { useState, useContext } from "react";
import "../css/CheckoutPage.css";
import { CartContext } from "../components/CartContext";
import logo from "../assets/logo.png";

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);

  // Function to calculate total price and taxes
  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) {
      return { subtotal: 0, gst: 0, qst: 0, total: 0 }; // Default values for empty cart
    }

    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.quantity * (item.discountedPrice || item.price),
      0
    );
    const gst = subtotal * 0.05; // 5% GST
    const qst = subtotal * 0.09975; // 9.975% QST
    const total = subtotal + gst + qst;

    return { subtotal, gst, qst, total };
  };

  const { subtotal, gst, qst, total } = calculateTotal();

  // State for location, payment, and shipping
  const [location, setLocation] = useState("Canada");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Update shipping address fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Confirm order action
  const handleOrderConfirm = (e) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Order Confirmation</h2>
        <div className="order-summary bg-light p-4 rounded shadow-sm d-flex justify-content-between">
          <div className="order-details">
            <p>Thank you for your order, {shippingAddress.name}!</p>
            <h4>Order Summary</h4>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>GST: ${gst.toFixed(2)}</p>
            {location === "Quebec" && <p>QST: ${qst.toFixed(2)}</p>}
            <p>Total: ${total.toFixed(2)}</p>
            <h4>Shipping Address</h4>
            <p>
              {shippingAddress.name}, {shippingAddress.street},{" "}
              {shippingAddress.city}, {shippingAddress.province},{" "}
              {shippingAddress.postalCode}
            </p>
            <p>Payment Method: {paymentMethod}</p>
          </div>
          <div className="order-logo">
            <img src={logo} alt="Logo" className="img-fluid medium-logo" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Checkout</h2>

      {/* Order Summary Section */}
      <section className="order-summary bg-light p-4 rounded shadow-sm mb-4">
        <h4>Order Summary</h4>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>GST: ${gst.toFixed(2)}</p>
        {location === "Quebec" && <p>QST: ${qst.toFixed(2)}</p>}
        <p>Total: ${total.toFixed(2)}</p>
      </section>

      {/* Location Selector */}
      <div className="mb-4">
        <label htmlFor="location" className="form-label">
          Select Location:
        </label>
        <select
          id="location"
          className="form-select"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="Canada">Canada</option>
          <option value="Quebec">Quebec</option>
        </select>
      </div>

      {/* Payment Methods */}
      <section className="mb-4">
        <h4>Payment Method</h4>
        {["Credit Card", "PayPal", "Bank Transfer"].map((method) => (
          <div className="form-check" key={method}>
            <input
              type="radio"
              id={method}
              name="paymentMethod"
              className="form-check-input"
              value={method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor={method} className="form-check-label">
              {method}
            </label>
          </div>
        ))}
      </section>

      {/* Shipping Address Form */}
      <section className="shipping-address bg-light p-4 rounded shadow-sm mb-4">
        <h4>Shipping Address</h4>
        <form onSubmit={handleOrderConfirm}>
          {["name", "street", "city", "province", "postalCode"].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field} className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type="text"
                id={field}
                name={field}
                className="form-control"
                value={shippingAddress[field]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="checkout-form-button btn btn-primary w-100"
          >
            Confirm Order
          </button>
        </form>
      </section>
    </div>
  );
};

export default CheckoutPage;

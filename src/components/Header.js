import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Header = ({ onSearch }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const uniqueItemCount = cart.length;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "60px", height: "60px" }}
            className="me-2"
          />
          <span className="h5 mb-0">CST Store</span>
        </a>

        {/* Hamburger Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="d-flex w-100 align-items-center">
            {/* Cart Button */}
            <div style={{ position: "relative" }}>
              <Link
                to="/cart"
                className="d-flex align-items-center"
                style={{ textDecoration: "none", color: "black" }}
              >
                <i className="bi bi-cart-fill fs-4 me-2"></i>
                <span>Cart</span>
              </Link>
              {uniqueItemCount > 0 && (
                <span
                  className="badge bg-danger rounded-circle"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-15px",
                    fontSize: "0.8rem",
                  }}
                >
                  {uniqueItemCount}
                </span>
              )}
            </div>

            {/* Search Bar */}
            <form
              className="d-flex flex-grow-1 ms-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search products"
                aria-label="Search"
                onChange={(e) => onSearch(e.target.value)} // Pass search term to App.js
              />
              <button className="btn btn-outline-success ms-2" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews =
      JSON.parse(localStorage.getItem(`reviews-${product.id}`)) || [];
    const combinedReviews = [...product.reviews, ...storedReviews];
    setReviews(combinedReviews.length > 0 ? combinedReviews : product.reviews);
  }, [product.id, product.reviews]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <span
              key={`full-${index}`}
              style={{ color: "gold", fontSize: "24px" }}
            >
              ★
            </span>
          ))}
        {halfStar && <span style={{ color: "gold", fontSize: "24px" }}>☆</span>}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <span
              key={`empty-${index}`}
              style={{ color: "gray", fontSize: "24px" }}
            >
              ☆
            </span>
          ))}
        <span style={{ marginLeft: "8px", fontSize: "16px", color: "#555" }}>
          ({reviews.length} reviews)
        </span>
      </div>
    );
  };

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const calculateAverageRating = () => {
    const allRatings = [
      ...product.reviews.map((review) => review.rating),
      ...reviews.map((review) => review.rating),
    ];

    if (allRatings.length === 0) return 0;

    const totalRating = allRatings.reduce((acc, rating) => acc + rating, 0);
    return (totalRating / allRatings.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="col-md-3 mb-4">
      <div
        className="card shadow-sm"
        style={{
          border: "none",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <img
          src={product.images[0]}
          className="card-img-top"
          alt={product.title}
          style={{ height: "200px", objectFit: "contain" }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          {renderStars(averageRating)}
          <p
            className="card-text"
            style={{ marginTop: "10px", display: "flex", alignItems: "center" }}
          >
            <span
              style={{
                color: "green",
                fontSize: "18px",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              ${discountedPrice}
            </span>
            <span
              style={{
                textDecoration: "line-through",
                color: "red",
                fontSize: "16px",
              }}
            >
              ${product.price.toFixed(2)}
            </span>
          </p>
        </div>

        <div style={{ textAlign: "center", padding: "10px" }}>
          <Link
            to={`/product/${product.id}`}
            className="btn btn-primary product-btn"
          >
            Product Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";
import ReviewForm from "./ReviewForm";

const ProductDetail = ({ productId, addToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(productId);
      setProduct(data);
      setLoading(false);
    };
    getProduct();
  }, [productId]);

  useEffect(() => {
    const savedReviews =
      JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];
    setReviews(savedReviews);
  }, [productId]);

  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem(`reviews-${productId}`, JSON.stringify(reviews));
    }
  }, [reviews, productId]);

  const addReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const calculateAverageRating = () => {
    const allRatings = [
      ...product.reviews.map((review) => review.rating),
      ...reviews.map((review) => review.rating),
    ];

    if (allRatings.length === 0) return 0;

    const totalRating = allRatings.reduce((acc, rating) => acc + rating, 0);
    return (totalRating / allRatings.length).toFixed(1);
  };

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
        <span style={{ marginLeft: "5px", color: "grey", fontSize: "16px" }}>
          (Total reviews: {reviews.length + product.reviews.length})
        </span>
      </div>
    );
  };

  const handleZoom = (e) => {
    const zoomImage = e.target;
    const zoomRatio = 2;
    const x = (e.offsetX / zoomImage.width) * 100;
    const y = (e.offsetY / zoomImage.height) * 100;

    zoomImage.style.transformOrigin = `${x}% ${y}%`;
    zoomImage.style.transform = `scale(${zoomRatio})`;
  };

  const resetZoom = (e) => {
    e.target.style.transform = "scale(1)";
  };

  const handleAddToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if product already exists
    } else {
      storedCart.push({ ...product, quantity: 1 }); // Add new product to cart
    }

    localStorage.setItem("cart", JSON.stringify(storedCart)); // Save updated cart to localStorage
    alert(`${product.title} added to the cart!`);
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const averageRating = calculateAverageRating();
  const allReviews = [...product.reviews, ...reviews];

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const availabilityText =
    product.availabilityStatus === "In Stock" || product.stock > 0
      ? "In Stock"
      : "Out of Stock";
  const availabilityColor =
    product.availabilityStatus === "In Stock" || product.stock > 0
      ? "green"
      : "red";

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://codesandbox.io/p/sandbox/clientwebapp-l4ltg4/?productId=${productId}&size=100x100`;

  return (
    <div className="container">
      <h1 style={{ marginBottom: "20px" }}>{product.title}</h1>

      <div className="row">
        <div className="col-md-6">
          <div
            className="image-zoom-container"
            onMouseMove={handleZoom}
            onMouseLeave={resetZoom}
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="zoom-image"
              style={{
                width: "100%",
                height: "auto",
                transition: "transform 0.2s",
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <p>{product.description}</p>
          <p>
            <span
              style={{
                textDecoration: "line-through",
                color: "red",
                marginRight: "10px",
              }}
            >
              ${product.price.toFixed(2)}
            </span>
            <span style={{ color: "green", fontSize: "1.5em" }}>
              ${discountedPrice}
            </span>
          </p>

          <div>{renderStars(averageRating)}</div>

          <p
            style={{
              fontSize: "1.2em",
              color: "grey",
              marginTop: "1px",
            }}
          >
            Availability: {availabilityText}
          </p>

          <button
            onClick={() => handleAddToCart(product)}
            className="btn btn-primary mt-1 mb-4"
          >
            Add to Cart
          </button>

          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <h4>Product QR Code</h4>
            <img src={qrCodeUrl} alt="QR Code" />
          </div>

          <div>
            <h5>User Reviews</h5>
            {allReviews.length > 0 ? (
              allReviews.map((review, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <p>
                    <strong>{review.reviewerName}</strong> ({review.rating} star
                    {review.rating > 1 ? "s" : ""})
                  </p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          <ReviewForm productId={productId} addReview={addReview} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

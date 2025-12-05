import React, { useState } from "react";

const ReviewForm = ({ productId, addReview }) => {
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a rating and a comment.");
      return;
    }

    const newReview = {
      reviewerName: reviewerName || "Anonymous",
      rating,
      comment,
    };

    addReview(newReview);

    // Reset form fields
    setReviewerName("");
    setRating(0);
    setComment("");
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  return (
    <div className="mt-4">
      <h5>Submit Your Review</h5>
      <form onSubmit={handleSubmit}>
        {/* Star rating section */}
        <div className="mb-3">
          <div className="star-rating" style={{ display: "flex" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleStarClick(star)}
                style={{
                  cursor: "pointer",
                  fontSize: "24px",
                  color: star <= rating ? "gold" : "gray",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Name input section */}
        <div className="mb-3">
          <label htmlFor="reviewerName" className="form-label">
            Your Name (optional)
          </label>
          <input
            type="text"
            className="form-control"
            id="reviewerName"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        {/* Review text area */}
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            Review
          </label>
          <textarea
            id="comment"
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here"
            rows="3"
          ></textarea>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;

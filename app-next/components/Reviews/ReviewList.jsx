"use client";

import { useState, useEffect } from "react";

const ReviewList = ({ mealId, onReviewSubmit }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/reviews/");
      const data = await res.json();
      const mealReviews = data.filter((r) => r.meal_id === Number(mealId));
      setReviews(mealReviews);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(`http://localhost:3001/api/reviews/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Review deleted!");
        await fetchReviews(); // Refresh the review list
        await onReviewSubmit(); // Refresh parent page if needed
      } else {
        alert("Failed to delete review.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((rev) => (
          <div key={rev.id} style={{ marginBottom: "1rem" }}>
            <strong>
              {rev.title} - {rev.stars}⭐
            </strong>
            <p>{rev.description}</p>
            <button onClick={() => handleDelete(rev.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;

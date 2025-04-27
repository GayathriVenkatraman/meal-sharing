"use client";

import React from "react";
import StarRating from "./StarRating";
import styles from "./ReviewForm.module.css";
import { useState } from "react";

const ReviewForm = ({ mealId, onReviewSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stars: 5,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prevData) => ({
      ...prevData,
      stars: rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3001/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal_id: Number(mealId),
          title: formData.title,
          description: formData.description,
          stars: Number(formData.stars),
          created_date: new Date().toISOString().split("T")[0],
        }),
      });
      if (!res.ok) {
        throw new Error("failed to create review");
      }

      setMessage("Review submitted successfully!");
      setFormData({
        title: "",
        description: "",
        stars: 5,
      });
      await onReviewSubmit();
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage(
        "An error occurred while submitting your review. Please try again later."
      );
    }
  };
  return (
    <div className={styles.reviewForm}>
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label>Rating:</label>
          <StarRating
            rating={formData.stars}
            onRatingChange={handleRatingChange}
          />
        </div>
        {message && <p className={styles.message}>{message}</p>}
        <button type="submit" className={styles.submitButton}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;

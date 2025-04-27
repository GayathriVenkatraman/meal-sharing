"use client";

import React from "react";
import { useState } from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div style={{ display: "flex", gap: "5px", fontSize: "28px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
          onClick={() => onRatingChange(star)}
          style={{
            fontSize: "24px",
            color: star <= (hoveredStar || rating) ? "#FFD700" : "#ccc",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;

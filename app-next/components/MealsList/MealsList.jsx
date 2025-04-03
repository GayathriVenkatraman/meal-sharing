"use client";
import React, { useEffect, useState } from "react";
import styles from "./MealsList.module.css";

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/meals")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        setMeals(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className={styles.mealsHeader}>Meals List</h2>
      {meals.length === 0 ? (
        <p>No meals available</p>
      ) : (
        <ul>
          <div className={styles.mealsContainer}>
            {meals.map((meal) => (
              <li key={meal.id}>
                <div key={meal.id} className={styles.mealCard}>
                  <h3 className={styles.mealTitle}>{meal.title}</h3>
                  <p className={styles.mealDescription}>
                    <strong>Description:</strong> {meal.description}
                  </p>
                  <p className={styles.mealPrice}>Price: {meal.price}</p>
                  <p className={styles.maxReservation}>
                    Max Reservations: {meal.max_reservations}
                  </p>
                  <p className={styles.mealTime}>
                    Meal Time: {new Date(meal.meal_time).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default MealsList;

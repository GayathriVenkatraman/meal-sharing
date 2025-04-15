import React from "react";
import styles from "./Meal.module.css";

const Meal = ({ meal }) => {
  return (
    <div className={styles.mealCard}>
      <h3 className={styles.mealTitle}>{meal.title}</h3>
      <p className={styles.mealDescription}>
        <strong>Description:</strong> {meal.description}
      </p>
      <p className={styles.mealPrice}>Price: {meal.price}</p>
      <p className={styles.maxReservation}>
        Max Reservations: {meal.maxReservation}
      </p>
      <p className={styles.mealTime}>
        Meal Time: {new Date(meal.mealTime).toLocaleString()}
      </p>
      <p className={styles.mealLocation}>Location: {meal.location}</p>
    </div>
  );
};

export default Meal;

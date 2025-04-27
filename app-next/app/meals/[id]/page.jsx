"use client";

import React, { useState, useEffect } from "react";
import ReservationForm from "@/components/ReservationForm/ReservationForm";
import { useParams, useRouter } from "next/navigation";
import { getMealById, getReservations } from "@/utils/fetchFunctions";
import styles from "./meal.module.css";

// export async function generateStaticParams() {
//   const res = await fetch("http://localhost:3001/api/meals");
//   const meals = await res.json();

//   return meals.map((meal) => ({
//     id: meal.id.toString(),
//   }));
// }

const MealPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [meal, setMeal] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const mealData = await getMealById(id);
        setMeal(mealData);
        const allReservations = await getReservations();
        const filtered = allReservations.filter(
          (r) => r.meal_id === Number(id)
        );

        setReservations(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMealData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("meal", meal);
  if (!meal.id) {
    return <div>Meal not found</div>;
  }

  const totalReserved = reservations.reduce(
    (sum, r) => sum + r.number_of_guests,
    0
  );
  const availableSeats = meal.max_reservations - totalReserved;
  const mealDate = new Date(meal.meal_time).toLocaleDateString("da-DK");

  return (
    <div className={styles.mealPage}>
      <button className={styles.backButton} onClick={() => router.back()}>
        ← Go Back
      </button>
      <h1>{meal.title}</h1>

      <p>
        <strong>Description:</strong> {meal.description}
      </p>
      <p>
        <strong>Location:</strong> {meal.location}
      </p>
      <p>
        <strong>Date:</strong> {mealDate}
      </p>
      <p>
        <strong>Price:</strong> €{meal.price}
      </p>
      <p>
        <strong>Seats left:</strong>{" "}
        {availableSeats > 0 ? availableSeats : "None"}
      </p>
      {availableSeats > 0 && (
        <>
          <h2>Book a seat</h2>
          <ReservationForm mealId={meal.id} availableSeats={availableSeats} />
        </>
      )}
    </div>
  );
};

export default MealPage;

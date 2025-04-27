"use client";

import React, { useState, useEffect } from "react";
import ReservationForm from "@/components/ReservationForm/ReservationForm";
import ReservationList from "@/components/ReservationForm/ReservationList";
import ReviewForm from "@/components/Reviews/ReviewForm";
import ReviewList from "@/components/Reviews/ReviewList";
import { useParams, useRouter } from "next/navigation";
import { getMealById, getReservations } from "@/utils/fetchFunctions";
import styles from "./meal.module.css";

const MealPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [meal, setMeal] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealAndReservations = async () => {
      try {
        const mealData = await getMealById(id);
        setMeal(mealData);
        const allReservations = await getReservations();
        const filtered = allReservations.filter(
          (r) => r.meal_id === Number(id)
        );
        const reservedGuests = filtered.reduce(
          (sum, r) => sum + r.number_of_guests,
          0
        );
        const seats = mealData.max_reservations - reservedGuests;

        setReservations(filtered);
        setAvailableSeats(seats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMealAndReservations();
  }, [id]);

  const refreshReservations = async () => {
    await fetchMealAndReservations();
  };

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
  //const availableSeats = meal.max_reservations - totalReserved;
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
      <ReservationList
        mealId={meal.id}
        onReservationChange={refreshReservations}
      />

      <ReviewForm mealId={meal.id} onReviewSubmit={() => {}} />
      <ReviewList mealId={meal.id} onReviewSubmit={() => {}} />
    </div>
  );
};

export default MealPage;

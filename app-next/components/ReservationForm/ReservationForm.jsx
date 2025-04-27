"use client";
import React, { useState } from "react";
import styles from "./Reservation.module.css";

const ReservationForm = ({ mealId, availableSeats }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3001/api/reservations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal_id: Number(mealId),
          contact_name: formData.name,
          contact_email: formData.email,
          contact_phonenumber: formData.phone,
          number_of_guests: Number(formData.guests),
          created_date: new Date().toISOString().split("T")[0],
        }),
      });
      if (!res.ok) {
        throw new Error("failed to create reservation");
      }

      setMessage("Reservation submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: 1,
      });
    } catch (error) {
      console.error("Error submitting reservation:", error);
      setMessage(
        "An error occurred while submitting your reservation. Please try again later."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="guests"
        placeholder="Number of Guests"
        value={formData.guests}
        onChange={handleChange}
        min="1"
        max={availableSeats}
        required
      />
      <button type="submit" disabled={availableSeats <= 0}>
        {availableSeats > 0 ? "Reserve" : "No Seats Available"}
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default ReservationForm;

export async function getAvailableSeats(mealId) {
  try {
    const res = await fetch(`http://localhost:3001/api/meals/${mealId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch available seats");
    }
    const meal = await res.json();
    return meal.available_seats;
  } catch (error) {
    console.error("Error fetching available seats:", error);
    return 0;
  }
}

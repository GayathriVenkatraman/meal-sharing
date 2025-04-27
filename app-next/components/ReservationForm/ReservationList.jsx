"use client";

import React from "react";
import { useState, useEffect } from "react";

const ReservationList = ({ mealId, onReservationChange }) => {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/reservations/");
      const data = await res.json();
      const mealReservations = data.filter((r) => r.meal_id === Number(mealId));
      setReservations(mealReservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to cancel this reservation?")) return;

    try {
      const res = await fetch(`http://localhost:3001/api/reservations/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("Reservation deleted successfully.");
        await fetchReservations();
        await onReservationChange();
      } else {
        setMessage("Failed to delete reservation.");
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      setMessage("Error deleting reservation.");
    }
  };

  return (
    <div>
      <h3>Reservations for this Meal</h3>
      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        reservations.map((res) => (
          <div key={res.id} style={{ marginBottom: "1rem" }}>
            <p>
              {res.contact_name} ({res.number_of_guests} guests)
            </p>
            <button onClick={() => handleDelete(res.id)}>Delete</button>
          </div>
        ))
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReservationList;

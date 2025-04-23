import MealsList from "@/components/MealsList/MealsList";
import React from "react";

const Meals = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>All Meals</h1>
      <MealsList />
    </div>
  );
};

export default Meals;

"use client";

import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import styles from "./HomePage.module.css";
import MealsList from "../MealsList/MealsList";

// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <div>
      <h1 className={styles.homeHeader}>Welcome to Meal Sharing</h1>
      <MealsList />
    </div>
  );
}

export default HomePage;

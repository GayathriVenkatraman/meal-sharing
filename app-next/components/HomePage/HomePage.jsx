"use client";

import styles from "./HomePage.module.css";
import MealsList from "../MealsList/MealsList";
import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1 className={styles.homeHeader}>Welcome to Meal Sharing</h1>
      <MealsList limit={3} />

      <div className={styles.buttonContainer}>
        <Link href="/meals" className={styles.button}>
          See All Meals
        </Link>
      </div>
    </div>
  );
}

export default HomePage;

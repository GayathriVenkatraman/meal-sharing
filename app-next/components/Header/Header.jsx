"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.jpg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={logo} alt="Logo" />
      </div>
      <h1 className={styles.title}>Meal Sharing App</h1>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navItem}>
          Home
        </Link>

        <Link href="/meals" className={styles.navItem}>
          All Meals
        </Link>
      </nav>
    </header>
  );
};

export default Header;

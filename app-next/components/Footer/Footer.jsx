"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Footer.module.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGoogle,
  FaTiktok,
} from "react-icons/fa";
import Image from "next/image";

export const Footer = () => {
  const socialMediaLinks = [
    {
      title: "Facebook",
      url: "https://facebook.com",
      icon: <FaFacebook />,
    },
    {
      title: "Instagram",
      url: "https://instagram.com",
      icon: <FaInstagram />,
    },
    {
      title: "TikTok",
      url: "https://tiktok.com",
      icon: <FaTiktok />,
    },
    {
      title: "On the streets at night",
      url: "https://google.com",
      icon: <FaGoogle />,
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/",
      icon: <FaLinkedin />,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/meals">Meals</Link>
            </li>
          </ul>
        </div>
        <div className={styles.socialMedia}>
          <h3>Follow Us</h3>
          <ul className={styles.socialMediaList}>
            {socialMediaLinks.map((item) => (
              <li key={item.title}>
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} Hack Your Future. All rights
          reserved.
        </p>
        <p>Designed by Gayathri</p>
      </div>
    </footer>
  );
};

export default Footer;

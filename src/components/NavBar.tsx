import React from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const NavBar: React.FC = () => {

  return (
    <nav className={styles.navbar}>
      <h1>My Website</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

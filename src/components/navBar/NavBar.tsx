import React from "react";
import style from "./NavBar.module.css";
import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <nav>
      <div className={style.wrapper}>
        <Link href="/">
          <h1>Barangay Ciudad</h1>
        </Link>
        <div className={style.links}>
          <p>
            <Link href="/">News</Link>
          </p>
          <p>
            <Link href="/about">About</Link>
          </p>
          <p>
            <Link href="/products">Products</Link>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

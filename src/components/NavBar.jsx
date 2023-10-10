import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav>
      <div className="logo">CREAMY CUP</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="functions">
        <ion-icon name="search-outline"></ion-icon>
        <ion-icon name="person-circle-outline"></ion-icon>
        <ion-icon name="heart-outline"></ion-icon>
        <ion-icon name="cart-outline"></ion-icon>
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.authState.user);
  const cart = useSelector((state) => state.cart.cartItems);

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
        <Link to="cart" class="cart-icon">
          <ion-icon name="cart-outline"></ion-icon>
          {cart.length != 0 && <div className="count">{cart.length}</div>}
        </Link>
        <Link to={Object.keys(user).length != 0 ? "/profile" : "/signin"}>
          {user.name ? (
            <div className="user-icon">{user.name[0].toUpperCase()}</div>
          ) : (
            <ion-icon name="person-circle-outline"></ion-icon>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const user = useSelector((state) => state.authState.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  return (
    <nav>
      <input type="checkbox" id="nav-open" />
      <div className="mobilenav">
        <Link
          onClick={() => (document.getElementById("nav-open").checked = false)}
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={() => (document.getElementById("nav-open").checked = false)}
          to="/shop"
        >
          Shop
        </Link>
        <Link
          onClick={() => (document.getElementById("nav-open").checked = false)}
          to={Object.keys(user).length != 0 ? "/profile" : "/signin"}
        >
          {user.name ? <p>Profile</p> : <p>SignIn</p>}
        </Link>
      </div>
      <label className="nav-opener" htmlFor="nav-open">
        <ion-icon name="menu-outline"></ion-icon>
      </label>

      <div
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/logo.svg" alt="" />
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
      <div className="functions">
        <Link to="cart" className="cart-icon">
          <ion-icon name="cart-outline"></ion-icon>
          {cart.length != 0 && <div className="count">{cart.length}</div>}
        </Link>
        <Link
          className="user-icon-wrap"
          to={Object.keys(user).length != 0 ? "/profile" : "/signin"}
        >
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

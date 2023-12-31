import { useState } from "react";
import NavBar from "./components/NavBar";
import CoffeeCard from "./components/CoffeeCard";
import { useNavigate } from "react-router-dom";
const products = {
  special: {
    image: "/special.png",
    name: "Special Flavors",
    description: "A special blend of coffee beans from the hills of Coorg",
  },
  original: {
    image: "/originals.png",
    name: "Original Flavors",
    description: "The original tradition of coffee from the years",
  },
  fruity: {
    image: "/fruity.png",
    name: "Fruity Flavors",
    description: "A fruity blend of coffee beans from the hills of Coorg",
  },
};

const App = () => {
  const navigate = useNavigate();
  return (
    <div className="app">
      <div className="title">
        <img src="/coffee.png" alt="" className="right-img" />
        <img src="/coffee.png" alt="" className="left-img" />
        <div className="text">
          <p>Exquisite Journey into Coorg's Arabica Bliss</p>
          <span>
            <img src="/logo.png" alt="" />
          </span>
          <p>
            Discover the Finest Coffee Beans from the Heart of Kodagu, Crafted
            with Love for Your Perfect Brew
          </p>
          <button onClick={() => navigate("/shop")}>Shop Now</button>
        </div>
        <div className="image">
          <img src="/homegrouped.png" alt="" />
        </div>
      </div>
      <div className="category">
        <h1>Shop by Category</h1>
        <div className="cards">
          <CoffeeCard coffee={products.special} />
          <CoffeeCard coffee={products.original} />
          <CoffeeCard coffee={products.fruity} />
        </div>
      </div>
    </div>
  );
};

export default App;

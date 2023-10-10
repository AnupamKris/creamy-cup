import { useState } from "react";
import NavBar from "./components/NavBar";
import CoffeeCard from "./components/CoffeeCard";

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
  return (
    <div className="app">
      <NavBar />
      <div className="title">
        <div className="text">
          <p>Exquisite Journey into Coorg's Arabica Bliss</p>
          <span>CREAMY CUP</span>
          <p>
            Discover the Finest Coffee Beans from the Heart of Kodagu, Crafted
            with Love for Your Perfect Brew
          </p>
          <button>Shop Now</button>
        </div>
        <div className="image">
          <img className="dark" src="/dark.png" alt="" />
          <img className="filt" src="/filter.png" alt="" />
          <img className="spec" src="/creamy1.png" alt="" />
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

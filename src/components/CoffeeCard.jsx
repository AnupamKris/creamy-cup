import React from "react";
import { useNavigate } from "react-router-dom";
const CoffeeCard = ({ coffee }) => {
  const navigate = useNavigate();
  return (
    <div className="coffee-card">
      <img src={coffee.image} alt={coffee.name} />
      <h2>{coffee.name}</h2>
      <p>{coffee.description}</p>
      <button onClick={() => navigate("/shop")}>Explore</button>
    </div>
  );
};

export default CoffeeCard;

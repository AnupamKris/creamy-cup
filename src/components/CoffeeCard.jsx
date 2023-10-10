import React from "react";

const CoffeeCard = ({ coffee }) => {
  return (
    <div className="coffee-card">
      <img src={coffee.image} alt={coffee.name} />
      <h2>{coffee.name}</h2>
      <p>{coffee.description}</p>
      <button>Explore</button>
    </div>
  );
};

export default CoffeeCard;

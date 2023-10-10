import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import products from "../products.json";
import { useState } from "react";
import Review from "../components/Review";
const Product = () => {
  const { product } = useParams();
  const productData = products[product];
  const [currentTab, setCurrentTab] = useState("desc");
  return (
    <div className="product">
      <NavBar />
      <div className="container">
        <div className="image">
          <img src={productData.image} alt="" />
        </div>
        <div className="description">
          <div className="tabs">
            <p
              class={currentTab == "desc" ? "selected" : ""}
              onClick={() => setCurrentTab("desc")}
            >
              Description
            </p>
            <p
              class={currentTab == "rev" ? "selected" : ""}
              onClick={() => setCurrentTab("rev")}
            >
              Reviews
            </p>
          </div>
          {currentTab == "desc" ? (
            <div className="desc">
              <h1>{productData.name}</h1>
              <p>{productData.description}</p>
              <div className="tags">
                {productData.tags.map((tag) => {
                  return <span className="tag">{tag}</span>;
                })}
              </div>

              <div className="ratings">
                <p className="star">4.6⭐</p>
                <p>125 Ratings & 26 Reviews</p>
              </div>
              <p className="sub">Plantation</p>
              <p>
                Creamy Cup Coorg Coffee use finest Arabica beans sourced from
                the Mountain view plantation Coorg (Kodagu).
              </p>
              <div className="sub">Ingredients</div>
              <p>Coffee Beans, Natural Flavours.</p>

              <div className="buttons">
                <button>Buy Now</button>
                <button>Add to Cart</button>
              </div>
            </div>
          ) : (
            <div className="reviews">
              <div className="rev">
                <Review
                  username="John Doe"
                  review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                  date="20th June 2023"
                />
                <Review
                  username="John Doe"
                  review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                  date="20th June 2023"
                />
                <Review
                  username="John Doe"
                  review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                  date="20th June 2023"
                />
                <Review
                  username="John Doe"
                  review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                  date="20th June 2023"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

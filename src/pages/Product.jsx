import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Review from "../components/Review";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";
import axios from "axios";

const Product = () => {
  const { product } = useParams();
  const [productData, setProductData] = useState({});
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("desc");

  const getProductData = async () => {
    let res = await axios.get("http://dremerz-erp.com/creamycup/productData", {
      params: { product_id: product },
    });
    console.log(res);
    setProductData(res.data);
  };

  useEffect(() => {
    getProductData();
  }, []);

  const addItemToCart = () => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (productData.stocks == 0) {
      alert("Out of stock");
      return;
    }
    if (index !== -1) {
      dispatch(
        addToCart({
          ...cart[index],
          quantity: cart[index].quantity + 1,
        })
      );
      alert("Item quantity updated");
      return;
    }
    dispatch(
      addToCart({
        id: product,
        quantity: 1,
      })
    );
    alert("Item added to cart");
  };

  return (
    <div className="product">
      {Object.keys(productData).length !== 0 && (
        <div className="container">
          <div className="image">
            <img src={productData.image} alt="" />
          </div>
          <div className="description">
            <div className="tabs">
              <p
                className={currentTab == "desc" ? "selected" : ""}
                onClick={() => setCurrentTab("desc")}
              >
                Description
              </p>
              <p
                className={currentTab == "rev" ? "selected" : ""}
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
                    return (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    );
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
                  <button onClick={addItemToCart}>Add to Cart</button>
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
      )}
    </div>
  );
};

export default Product;

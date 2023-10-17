import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Review from "../components/Review";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { product } = useParams();
  const [productData, setProductData] = useState({});
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("desc");
  const navigate = useNavigate();
  const getProductData = async () => {
    let res = await axios.get("https://dremerz-erp.com/creamycup/productData", {
      params: { product_id: product },
    });
    console.log(res);
    setProductData(res.data);
  };

  const closeProduct = () => {
    navigate("/shop");
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
    close();
  };

  return (
    <div className="product">
      {Object.keys(productData).length !== 0 && (
        <div className="container">
          <div className="close" onClick={closeProduct}>
            <ion-icon name="close-outline"></ion-icon>
          </div>
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
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

import { useSelector, useDispatch } from "react-redux";
// import products from "../products";
import CartItem from "../components/CartItem.jsx";
import { addToCart, setDeliveryType } from "../cartSlice";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.authState.user);
  const deliveryType = useSelector((state) => state.cart.deliveryType);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductFromId = (id) => {
    return products.filter((product) => product.id == id)[0];
  };

  useEffect(() => {}, []);

  const setDeliveryTypee = (type) => {
    dispatch(setDeliveryType(type));
  };

  const getProducts = async () => {
    let res = await axios.get("http://dremerz-erp.com/creamycup/products");
    console.log(res);
    setProducts(res.data);
    console.log(res.data.filter((product) => product.id == "asdasd"));
  };

  useEffect(() => {
    getProducts();
    console.log(cart);
  }, []);

  const checkOut = () => {
    console.log("ASSD");
    if (cart.length == 0) {
      alert("Cart is empty");
      return;
    } else if (Object.keys(user).length == 0) {
      navigate("/signin/checkout");
      return;
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div className="cart">
      {Object.keys(products).length && (
        <div className="container">
          <div className="cart-holder">
            <div className="heading">
              <p>Shopping Cart</p>
              <span>{cart.length} Items</span>
            </div>
            <div className="titles">
              <p className="proddet">Product Details</p>
              <p>Quantity</p>
              <p>Price</p>
              <p>Total</p>
            </div>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                image={getProductFromId(item.id).image}
                name={getProductFromId(item.id).name}
                description={getProductFromId(item.id).description}
                quantity={item.quantity}
                setQuantity={(value) =>
                  dispatch(
                    addToCart({
                      ...item,
                      quantity: value,
                    })
                  )
                }
                price={getProductFromId(item.id).price}
              />
            ))}
            <Link className="contn" to="/shop">
              <ion-icon name="arrow-back-outline"></ion-icon> Continue Shopping
            </Link>
          </div>

          <div className="summary">
            <div className="heading">
              <p>Order Summary</p>
            </div>
            <div className="itemscount">
              <p>ITEMS {cart.length}</p>
              <p>
                &#8377;
                {cart.reduce((acc, item) => {
                  return acc + item.quantity * getProductFromId(item.id).price;
                }, 0)}
              </p>
            </div>
            <div className="itemscount">
              <p>SHIPPING</p>
            </div>
            <div className="delivery">
              <span
                onClick={() => setDeliveryTypee("standard")}
                className={deliveryType == "standard" ? "selected" : ""}
              >
                <div className="between">
                  <p>Standard Delivery</p> <p>FREE</p>
                </div>
                <p>5-7 working days</p>
              </span>
              <span
                onClick={() => setDeliveryTypee("express")}
                className={deliveryType == "express" ? "selected" : ""}
              >
                <div className="between">
                  <p>Express Delivery</p>
                  <p>&#8377;40</p>
                </div>
                <p>3-5 working days</p>
              </span>
            </div>
            <div className="totalcost">
              <p>TOTAL COST</p>
              <p>
                &#8377;
                {cart.reduce(
                  (acc, item) => {
                    return (
                      acc + item.quantity * getProductFromId(item.id).price
                    );
                  },
                  deliveryType == "express" ? 40 : 0
                )}
              </p>
            </div>
            <button className="checkoutButton" onClick={checkOut}>
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

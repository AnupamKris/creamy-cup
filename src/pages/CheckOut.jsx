import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../cartSlice";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

const CheckOut = () => {
  const user = useSelector((state) => state.authState.user);
  const token = useSelector((state) => state.authState.token);
  const cart = useSelector((state) => state.cart.cartItems);
  const deliveryType = useSelector((state) => state.cart.deliveryType);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPincode, setShippingPincode] = useState("");
  const dispatch = useDispatch();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
    getProducts();
    if (user.shippingData != undefined) {
      setShippingName(user.shippingData.name);
      setShippingPhone(user.shippingData.phone);
      setShippingEmail(user.shippingData.email);
      setShippingAddress(user.shippingData.address);
      setShippingPincode(user.shippingData.pincode);
    }
  }, []);

  const getProducts = async () => {
    let res = await axios.get("https://dremerz-erp.com/creamycup/products");
    console.log(res);
    setProducts(res.data);
  };

  const getProductFromId = (id) => {
    return products.filter((product) => product.id == id)[0];
  };

  const generateReceipt = async (res) => {
    console.log("HADNLER RUNNIG", res);
    let data = axios.post(
      "https://dremerz-erp.com/creamycup/createReciept",
      res,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    // emptycarrt
    dispatch(emptyCart());

    console.log(await data);
    alert("Order Placed");
    navigate("/profile");
  };

  const checkOutOrder = async () => {
    if (Object.keys(user).length == 0) {
      navigate("/signin/checkout");
    }

    const order = await axios.post(
      "https://dremerz-erp.com/creamycup/createOrder",
      {
        user: user,
        cartData: cart,
        deliveryType: deliveryType,
        shippingData: {
          name: shippingName,
          phone: shippingPhone,
          email: shippingEmail,
          address: shippingAddress,
          pincode: shippingPincode,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    let options = {
      key: "rzp_test_NApl1QmxYvCYFj",
      amount: order.data.amount,
      currency: "INR",
      name: "Creamy Cup Coffee",
      description: "Order Details",
      order_id: order.data.id,
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingPhone,
      },
      handler: generateReceipt,
    };
    AdminDashboard;
    console.log(user.name, user.email, user.phone);
    let razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const checkOutOrderCOD = async () => {
    if (Object.keys(user).length == 0) {
      navigate("/signin/checkout");
    }

    const order = await axios.post(
      "https://dremerz-erp.com/creamycup/createOrder",
      {
        user: user,
        cartData: cart,
        deliveryType: deliveryType,
        shippingData: {
          name: shippingName,
          phone: shippingPhone,
          email: shippingEmail,
          address: shippingAddress,
          pincode: shippingPincode,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    // emptycarrt
    dispatch(emptyCart());
    let recieptData = {
      razorpay_order_id: order.data.id,
      razorpay_payment_id: "COD",
      razorpay_signature: "COD",
    };
    generateReceipt(recieptData);
  };

  // const getProductFromId = (iid) => {
  //   return {price:0};
  // };

  return (
    <div className="checkout">
      <div className="container">
        <div className="col">
          <p>Billing Address</p>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={shippingName}
              onChange={(e) => setShippingName(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={shippingPhone}
              onChange={(e) => setShippingPhone(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={shippingEmail}
              onChange={(e) => setShippingEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="address">Address</label>
            <textarea
              type="text"
              id="address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            ></textarea>
          </div>
          <div className="field">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              value={shippingPincode}
              onChange={(e) => setShippingPincode(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <p>Bill Total</p>
          {products.length != 0 && (
            <div className="bill">
              <div className="item">
                <span>Bill Amount :</span>
                <span>
                  {cart.reduce((acc, item) => {
                    return (
                      acc + item.quantity * getProductFromId(item.id).price
                    );
                  }, 0)}
                  .00
                </span>
              </div>
              <div className="item">
                <span>Delivery Charge :</span>
                <span>{deliveryType == "standard" ? 0 : 40}.00</span>
              </div>
              <div className="item">
                <span>
                  <b>Total :</b>
                </span>
                <span>
                  {cart.reduce(
                    (acc, item) => {
                      return (
                        acc + item.quantity * getProductFromId(item.id).price
                      );
                    },
                    deliveryType == "standard" ? 0 : 40
                  )}
                  .00
                </span>
              </div>
            </div>
          )}
          <div className="buttons">
            <button onClick={checkOutOrderCOD}>Place Order and COD</button>
            <button onClick={checkOutOrder}>Place Order and Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

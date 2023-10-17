import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let res = await axios.get("http://localhost:5000/products");
    console.log(res);
    setProducts(res.data);
  };

  const getProductFromId = (id) => {
    return products.filter((product) => product.id == id)[0];
  };

  const generateReceipt = async (res) => {
    console.log("HADNLER RUNNIG", res);
    let data = axios.post("http://localhost:5000/createReciept", res, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    console.log(await data);
  };

  const checkOutOrder = async () => {
    if (Object.keys(user).length == 0) {
      navigate("/signin/checkout");
    }

    const order = await axios.post(
      "http://localhost:5000/createOrder",
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
    console.log(user.name, user.email, user.phone);
    let razorpay = new window.Razorpay(options);
    razorpay.open();
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
          <button onClick={checkOutOrder}>Place Order and Pay</button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

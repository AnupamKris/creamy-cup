import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const profile = () => {
  const [orders, setOrders] = useState([]);
  // const user = useSelector((state) => state.authState.user);
  // const token = useSelector((state) => state.authState.token);
  const user = {
    email: "anupamkris13262@gmail.com",
    name: "K S Anupam Krishna",
    phone: "6369900860",
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImV4cCI6MTY5NzU2MzczMn0.Qix0j1PX2XcW1Jl5WOCO9_kUUhkQziz3WvbdR5pr3AA";
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("orders");
  const [expand, setExpand] = useState(0);
  const [products, setProducts] = useState([]);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const changePassword = async () => {
    if (newPassword !== repeatNewPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      let res = await axios.post(
        "https://dremerz-erp.com/creamycup/changePassword",
        {
          password,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (res.status == 201) {
        alert("Password changed successfully");
        setPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
      }
    } catch (error) {
      alert("Check your current password or try again later");
    }
  };

  const getOrders = async () => {
    let res = await axios.post(
      "https://dremerz-erp.com/creamycup/getUserOrders",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    console.log(res);
    setOrders(res.data.reverse());
  };

  const getProducts = async () => {
    // let res = await axios.get("https://dremerz-erp.com/creamycup/products");
    let res = await axios.get("https://dremerz-erp.com/creamycup/products");
    console.log(res);
    setProducts(res.data);
  };

  const getProductFromId = (id) => {
    return products.filter((product) => product.id == id)[0];
  };

  useEffect(() => {
    if (user.name == undefined) {
      // navigate("/signin");
      return;
    }
    getOrders();
    getProducts();
  }, []);
  return (
    <div className="profile">
      <div className="container">
        <div className="tabs">
          <div
            onClick={() => setCurrentTab("profile")}
            className={currentTab == "profile" ? "selected" : ""}
          >
            Profile
          </div>
          <div
            onClick={() => setCurrentTab("orders")}
            className={currentTab == "orders" ? "selected" : ""}
          >
            Orders
          </div>
        </div>
        {currentTab == "profile" && (
          <div className="profile-info">
            <div className="name">
              <div className="circle">
                {user.name && user.name[0].toUpperCase()}
              </div>
              <h1>{user.name}</h1>
            </div>

            <div className="field margin">
              <label htmlFor="">Phone</label>
              <input type="text" value={user.phone} readOnly />
            </div>
            <h3 className="margin">Change Password</h3>
            <div className="field">
              <label htmlFor="password">Current Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                id="password"
              />
            </div>
            <div className="field">
              <label htmlFor="newPassword">New Password</label>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
                id="newPassword"
              />
            </div>
            <div className="field">
              <label htmlFor="repeatNewPassword">Repeat Password</label>
              <input
                value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}
                type="text"
                id="repeatNewPassword"
              />
            </div>

            <button onClick={changePassword}>Update Password</button>
          </div>
        )}
        {currentTab == "orders" && (
          <div className="orders">
            <h3>My Orders</h3>
            {orders &&
              orders.map((order, index) => (
                <div
                  key={index}
                  className={"order" + (expand == index ? " expand" : "")}
                  onClick={() => setExpand(index)}
                >
                  <div className="product-info">
                    <div
                      className={
                        "items " + (expand == index ? "expanded-items" : "")
                      }
                    >
                      {order.products.map((item) => (
                        <div className="item" key={item.id}>
                          <div className="image">
                            <img src={getProductFromId(item.id).image} alt="" />
                          </div>
                          <div className="details">
                            <p>{getProductFromId(item.id).name}</p>
                            <p>Qty : {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="titular">
                      <p>{order.products.length} Items</p>
                      <p>{order.amount / 100}</p>
                    </div>
                    <div className="order-status">
                      <p>Ordered: {order.time}</p>
                    </div>
                    <div className="status-big">
                      <div className="line">
                        <div className={"progress " + order.order_status}></div>
                      </div>
                      <div className="dots">
                        <div
                          className={
                            "dot " +
                            ([
                              "packing",
                              "shipped",
                              "delivered",
                              "out",
                            ].includes(order.order_status)
                              ? "blue"
                              : "")
                          }
                        >
                          <p>Packing</p>
                        </div>
                        <div
                          className={
                            "dot " +
                            (["shipped", "delivered", "out"].includes(
                              order.order_status
                            )
                              ? "blue"
                              : "")
                          }
                        >
                          <p>Shipped</p>
                        </div>
                        <div
                          className={
                            "dot " +
                            (["delivered", "out"].includes(order.order_status)
                              ? "blue"
                              : "")
                          }
                        >
                          <p>Out For Delivery</p>
                        </div>
                        <div
                          className={
                            "dot " +
                            (["delivered"].includes(order.order_status)
                              ? "blue"
                              : "")
                          }
                        >
                          <p>Delivered</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default profile;

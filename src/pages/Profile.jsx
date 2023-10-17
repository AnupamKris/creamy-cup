import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const profile = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.authState.user);
  const token = useSelector((state) => state.authState.token);
  const navigate = useNavigate();
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
    setOrders(res.data);
  };

  useEffect(() => {
    if (user.name == undefined) {
      navigate("/signin");
      return;
    }
    getOrders();
  }, []);
  return (
    <div className="profile">
      <div className="container">
        <div className="profile-info">
          <div className="name">
            <div className="circle"></div>
            <h1>{user.name}</h1>
          </div>

          <div className="field margin">
            <label htmlFor="">Phone</label>
            <input type="text" value={user.phone} readOnly />
          </div>
          <h3 className="margin">Change Password</h3>
          <div className="field">
            <label htmlFor="">Current Password</label>
            <input type="text" />
          </div>
          <div className="field">
            <label htmlFor="">New Password</label>
            <input type="text" />
          </div>
          <div className="field">
            <label htmlFor="">Repeat Password</label>
            <input type="text" />
          </div>

          <button>Update Password</button>
        </div>
        <div className="orders">
          <h3>My Orders</h3>
          {orders &&
            orders.map((order) => (
              <div className="order">
                <div className="product-info">
                  <div className="titular">
                    <p>{order.products.length} Items</p>
                    <p>{order.amount / 100}</p>
                  </div>
                  <div className="order-status">
                    <p>Ordered: {order.time}</p>
                    <p>Status: {order.order_status}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default profile;

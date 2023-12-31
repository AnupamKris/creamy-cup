import { useEffect, useState } from "react";
import axios from "axios";

import EditProduct from "../components/EditProduct";
import AddProduct from "../components/AddProduct";

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState("login");
  const [currentOrderStatusTab, setCurrentOrderStatusTab] = useState("all");
  const [orders, setOrders] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [products, setProducts] = useState({});
  const [adminToken, setAdminToken] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [filteredOrders, setFilteredOrders] = useState([orders]);

  useEffect(() => {
    if (currentOrderStatusTab == "all") {
      setFilteredOrders(orders);
    } else {
      let filter = orders.filter(
        (order) => order.order_status == currentOrderStatusTab
      );
      setFilteredOrders(filter);
    }
  }, [currentOrderStatusTab, orders]);

  useEffect(() => {
    getProducts();
  }, [showAdd, showEdit]);

  const getOrders = async () => {
    let res = await axios.get("https://dremerz-erp.com/creamycup/orders");
    console.log(res);
    setOrders(res.data.reverse());
  };

  const changeOrderStatus = async (e, orderid) => {
    console.log("Chaing Statis", orderid);
    let res = await axios.post(
      "https://dremerz-erp.com/creamycup/changeOrderStatus",
      {
        order_id: orderid,
        order_status: e.target.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminToken,
        },
      }
    );
    console.log(res.status);
    if (res.status == 201) {
      getOrders();
    }
  };

  const deleteProduct = async (productid) => {
    let cnf = confirm("Are you sure you want to delete this product?");
    if (!cnf) {
      return;
    }
    let res = await axios.post(
      "https://dremerz-erp.com/creamycup/deleteProduct",
      {
        product_id: productid,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminToken,
        },
      }
    );
    console.log(res.status);
    if (res.status == 201) {
      alert("Product deleted");
      getProducts();
    }
  };

  const getProducts = async () => {
    let res = await axios.get("https://dremerz-erp.com/creamycup/products");
    console.log(res);
    setProducts(res.data.reverse());
  };

  const loginAdmin = async () => {
    let res = await axios.post("https://dremerz-erp.com/creamycup/adminLogin", {
      username,
      password,
    });
    console.log(res);
    if (res.status == 201) {
      setAdminToken(res.data.token);
      setCurrentTab("orders");
    }
  };

  useEffect(() => {
    // getOrders();
    getProducts();
    getOrders();
    setFilteredOrders(orders);
  }, []);

  return (
    <div className="dashboard">
      {currentTab != "login" && (
        <div className="sidebar">
          <h3>Admin Dashboard</h3>
          <p onClick={() => setCurrentTab("orders")}>Orders</p>
          <p onClick={() => setCurrentTab("products")}>Products</p>
          {/* <p onClick={() => setCurrentTab("users")}>Users</p> */}
        </div>
      )}
      <div className="container">
        {currentTab == "login" && (
          <div className="login">
            <h3>Admin Login</h3>
            <div className="field">
              <label htmlFor="">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={loginAdmin}>Login</button>
          </div>
        )}
        {currentTab == "orders" && (
          <div className="orders">
            <div className="tabs">
              <p
                className={currentOrderStatusTab == "all" ? "cur-tab" : ""}
                onClick={() => setCurrentOrderStatusTab("all")}
              >
                All
              </p>
              <p
                className={currentOrderStatusTab == "packing" ? "cur-tab" : ""}
                onClick={() => setCurrentOrderStatusTab("packing")}
              >
                Packing
              </p>
              <p
                className={currentOrderStatusTab == "shipped" ? "cur-tab" : ""}
                onClick={() => setCurrentOrderStatusTab("shipped")}
              >
                Shipped
              </p>
              <p
                className={currentOrderStatusTab == "out" ? "cur-tab" : ""}
                onClick={() => setCurrentOrderStatusTab("out")}
              >
                Out For Delivery
              </p>
              <p
                className={
                  currentOrderStatusTab == "delivered" ? "cur-tab" : ""
                }
                onClick={() => setCurrentOrderStatusTab("delivered")}
              >
                Delivered
              </p>
            </div>
            {orders.length && (
              <div className="items">
                <div className="headings">
                  <p>Time</p>
                  <p>Email</p>
                  <p>Payment Status</p>
                  <p>Amount</p>
                  <p>Order Status</p>
                </div>
                {filteredOrders
                  .filter(
                    (product) => product.payment_status !== "Payment Pending"
                  )
                  .map((order) => {
                    return (
                      <div className="order" key={order.id}>
                        <p>{order.time}</p>
                        <p>{order.email}</p>

                        <p>{order.payment_status}</p>
                        <p>{order.amount / 100}</p>
                        <p>
                          <select
                            name="orderstatus"
                            id=""
                            value={order.order_status}
                            onChange={(e) =>
                              changeOrderStatus(e, order.order_id)
                            }
                          >
                            <option value="packing">Packing</option>
                            <option value="shipped">Shipped</option>
                            <option value="out">Out For Delivery</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </p>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
        {currentTab == "products" && (
          <div className="products-admin">
            <div className="buttons">
              <p
                onClick={() => {
                  setShowAdd(true);
                }}
              >
                Add Product
              </p>
              <p
                onClick={() => {
                  getProducts();
                }}
              >
                Refresh
              </p>
            </div>
            {products.map((product) => {
              return (
                <div className="product-admin" key={product.id}>
                  <p>{product.name}</p>
                  <p
                    className="edit del"
                    onClick={() => {
                      deleteProduct(product.id);
                    }}
                  >
                    Del
                  </p>
                  <p
                    className="edit"
                    onClick={() => {
                      setShowEdit(true);
                      setEditProduct(product.id);
                    }}
                  >
                    Edit
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {showEdit && (
          <EditProduct
            product={products.filter((product) => product.id == editProduct)[0]}
            setShowEdit={setShowEdit}
            productid={editProduct}
            adminToken={adminToken}
          />
        )}
        {showAdd && (
          <AddProduct setShowAdd={setShowAdd} adminToken={adminToken} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

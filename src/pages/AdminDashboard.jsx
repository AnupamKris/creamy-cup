import { useEffect, useState } from "react";
import axios from "axios";

import EditProduct from "../components/EditProduct";
import AddProduct from "../components/AddProduct";

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [products, setProducts] = useState({});

  useEffect(() => {
    getProducts();
  }, [showAdd, showEdit]);

  const getOrders = async () => {
    let res = await axios.get("https://dremerz-erp.com/creamycup/orders");
    console.log(res);
    setOrders(res.data);
  };

  const changeOrderStatus = async (e, orderid) => {
    console.log("Chaing Statis", orderid);
    let res = await axios.post(
      "https://dremerz-erp.com/creamycup/changeOrderStatus",
      {
        order_id: orderid,
        order_status: e.target.value,
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
    setProducts(res.data);
  };

  useEffect(() => {
    // getOrders();
    getProducts();
    getOrders();
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3>Admin Dashboard</h3>
        <p onClick={() => setCurrentTab("orders")}>Orders</p>
        <p onClick={() => setCurrentTab("products")}>Products</p>
        <p onClick={() => setCurrentTab("users")}>Users</p>
      </div>
      <div className="container">
        {currentTab == "orders" && (
          <div className="orders">
            <div className="tabs">
              <p>All</p>
              <p>Pending</p>
              <p>Delivered</p>
            </div>
            {orders.length && (
              <div className="items">
                {orders.map((order) => {
                  return (
                    <div className="order" key={order.id}>
                      <p>{order.time}</p>
                      <p>{order.email}</p>

                      <p>{order.payment_status}</p>
                      <p>{order.amount}</p>
                      <p>
                        <select
                          name="orderstatus"
                          id=""
                          value={order.order_status}
                          onChange={(e) => changeOrderStatus(e, order.order_id)}
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
          />
        )}
        {showAdd && <AddProduct setShowAdd={setShowAdd} />}
      </div>
    </div>
  );
};

export default AdminDashboard;

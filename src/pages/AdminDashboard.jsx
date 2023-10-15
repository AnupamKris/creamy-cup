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
  const getOrders = async () => {
    let res = await axios.get("http://dremerz-erp.com/creamycup/orders");
  };

  const deleteProduct = async (productid) => {
    let cnf = confirm("Are you sure you want to delete this product?");
    if (!cnf) {
      return;
    }
    let res = await axios.post(
      "http://dremerz-erp.com/creamycup/deleteProduct",
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
    let res = await axios.get("http://dremerz-erp.com/creamycup/products");
    console.log(res);
    setProducts(res.data);
  };

  useEffect(() => {
    // getOrders();
    getProducts();
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
            <div className="items"></div>
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
            {Object.keys(products).map((product) => {
              return (
                <div className="product-admin" key={product}>
                  <p>{products[product].name}</p>
                  <p
                    className="edit del"
                    onClick={() => {
                      deleteProduct(product);
                    }}
                  >
                    Del
                  </p>
                  <p
                    className="edit"
                    onClick={() => {
                      setShowEdit(true);
                      setEditProduct(product);
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
            product={products[editProduct]}
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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const shop = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState({});

  const getProducts = async () => {
    let res = await axios.get("http://localhost:5000/products");
    console.log(res);
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  const updateCat = (cat) => {
    let tempCat = [...category];
    if (tempCat.includes(cat)) {
      tempCat = tempCat.filter((item) => item !== cat);
    } else {
      tempCat = [...tempCat, cat];
    }
    setCategory(tempCat);
    if (tempCat.length === 0) {
      setFiltered(products);
    } else {
      let filter = Object.entries(products).filter((product) => {
        return tempCat.includes(product[1].category);
      });
      setFiltered(Object.fromEntries(filter));
    }
  };
  const [filtered, setFiltered] = useState(products);
  const navigate = useNavigate();
  const openProduct = (product) => {
    console.log("Clicked");
    navigate(`/product/${product}`);
  };

  return (
    <div className="shop">
      {/* <div className="sidebar">
        <div className="filters">
          <p>Filters</p>
          <span>Categories</span>
          <div className="category">
            <div className="field">
              <label htmlFor="originals">Originals</label>
              <input
                id="originals"
                type="checkbox"
                onChange={() => updateCat("originals")}
              />
            </div>
            <div className="field">
              <label htmlFor="fruity">Fruity</label>
              <input
                id="fruity"
                type="checkbox"
                onChange={() => updateCat("fruity")}
              />
            </div>
            <div className="field">
              <label htmlFor="special">Special</label>
              <input
                id="special"
                type="checkbox"
                onChange={() => updateCat("special")}
              />
            </div>
            <div className="field">
              <label htmlFor="chocolate">Chocolate</label>
              <input
                id="chocolate"
                type="checkbox"
                onChange={() => updateCat("chocolate")}
              />
            </div>
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="cards">
          {Object.keys(products).length !== 0 &&
            Object.entries(filtered).map((product) => {
              return (
                <ProductCard
                  product={product[1]}
                  key={product[0]}
                  openProduct={openProduct}
                  prodid={product[1].id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default shop;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const shop = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState({});

  const getProducts = async () => {
    let res = await axios.get("https://dremerz-erp.com/creamycup/products");
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

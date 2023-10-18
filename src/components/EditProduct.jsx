import { useState } from "react";
import axios from "axios";
const EditProduct = ({ product, setShowEdit, productid }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [tags, setTags] = useState(product.tags);
  const [currentTag, setCurrentTag] = useState("");
  const [stock, setStock] = useState(product.stocks);
  const [plantation, setPlantation] = useState(product.plantation);
  const [ingredients, setIngredients] = useState(product.ingredients);
  const [weight, setWeight] = useState(product.weight);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("https://dremerz-erp.com/creamycup/upload", formData)
        .then((response) => {
          setImage(response.data.imageUrl);
        })
        .catch((error) => {
          console.error("Image upload error:", error);
        });
    }
  };

  const updateProduct = async () => {
    console.log("update", product);
    const data = {
      name,
      description,
      price,
      image,
      tags,
      product_id: productid,
      stocks: stock,
      plantation,
      ingredients,
      weight,
    };

    data.stock = parseInt(data.stock);
    let res = await axios.post(
      "https://dremerz-erp.com/creamycup/updateProduct",
      {
        data,
      }
    );
    console.log(res.status);
    if (res.status == 201) {
      alert("Product updated");
      setShowEdit(false);
    }
  };

  return (
    <div className="edit-product">
      <div className="container">
        <h1>Edit Product</h1>

        <div className="form">
          <div className="field">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="image">Image Upload</label>
            <input type="file" id="image" onChange={handleImageUpload} />
          </div>
          {image && (
            <div className="field">
              <label>Uploaded Image</label>
              <img src={image} alt="Uploaded" style={{ maxWidth: "100%" }} />
            </div>
          )}
          <div className="field">
            <label htmlFor="">Weight</label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="field">
            <label htmlFor="">Plantation</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              value={plantation}
              onChange={(e) => setPlantation(e.target.value)}
            ></textarea>
          </div>
          <div className="field">
            <label htmlFor="">Ingredients</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
          </div>
          <div className="field">
            <label htmlFor="">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="">Tags</label>
            <div className="tags">
              {tags.map((tag) => (
                <span
                  className="tag"
                  onClick={() =>
                    setTags(tags.filter((curtag) => curtag !== tag))
                  }
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
            />
            <div className="buttonset">
              <button
                onClick={() => {
                  setTags([...tags, currentTag]);
                  setCurrentTag("");
                }}
              >
                Add Tag
              </button>
            </div>
          </div>
          <div className="buttonset">
            <button onClick={updateProduct}>Update</button>
            <button className="cancel" onClick={() => setShowEdit(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

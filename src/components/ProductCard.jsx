const ProductCard = ({ product, openProduct, prodid }) => {
  return (
    <div className="prod-card" onClick={() => openProduct(prodid)}>
      <div className="img" style={{ background: product.bgcolor }}>
        <img src={product.image} alt="" />
      </div>
      <span className="name">{product.name}</span>
      <p>{product.description}</p>
      <div className="tags">
        {product.tags.map((tag) => {
          return <span className="tag">{tag}</span>;
        })}
      </div>
      <div className="price">
        <div className="weight">{product.weight}</div>
        <div className="cost">₹{product.price}/-</div>
      </div>
    </div>
  );
};

export default ProductCard;

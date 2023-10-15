const CartItem = ({
  image,
  name,
  description,
  quantity,
  setQuantity,
  price,
}) => {
  return (
    <div className="cart-item">
      <div className="details">
        <div className="img">
          <img src={image} alt="" />
        </div>
        <div className="text">
          <p className="name">{name}</p>
          <p className="desc">{description}</p>
        </div>
      </div>
      <div className="qty">
        <button className="btn" onClick={() => setQuantity(quantity - 1)}>
          -
        </button>
        <span className="value">{quantity}</span>
        <button className="btn" onClick={() => setQuantity(quantity + 1)}>
          +
        </button>
      </div>
      <div className="price">
        &#8377;
        {price}
      </div>
      <div className="total">
        &#8377;
        {price * quantity}
      </div>
    </div>
  );
};

export default CartItem;

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
      <div className="img">
        <img src={image} alt="" />
      </div>
      <div className="desc">
        <div className="name">{name}</div>
        <div className="description">{description}</div>
        <div className="amount">
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
        </div>
      </div>
    </div>
  );
};

export default CartItem;

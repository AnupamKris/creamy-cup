import { useSelector, useDispatch } from "react-redux";
import products from "../products";
import CartItem from "../components/CartItem.jsx";
import { addToCart } from "../cartSlice";
const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  return (
    <div className="cart">
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart-holder">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              image={products[item.id].image}
              name={products[item.id].name}
              description={products[item.id].description}
              quantity={item.quantity}
              setQuantity={(value) =>
                dispatch(
                  addToCart({
                    ...item,
                    quantity: value,
                  })
                )
              }
              price={products[item.id].price * item.quantity}
            />
          ))}
        </div>
        <div className="total">
          <p>Total</p>
          <p className="price">
            &#8377;
            {cart.reduce((acc, item) => {
              return acc + item.quantity * products[item.id].price;
            }, 0)}
          </p>
        </div>
      </div>
      <button className="checkoutButton">Proceed To Checkout</button>
    </div>
  );
};

export default Cart;

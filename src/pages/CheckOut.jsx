import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import products from "../products";
const CheckOut = () => {
  const user = useSelector((state) => state.authState.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const deliveryType = useSelector((state) => state.cart.deliveryType);
  return (
    <div className="checkout">
      <div className="container">
        <div className="col">
          <p>Billing Address</p>
          <div className="field">
            <label htmlFor="">Name</label>
            <input type="text" />
          </div>
          <div className="field">
            <label htmlFor="">Phone Number</label>
            <input type="text" />
          </div>
          <div className="field">
            <label htmlFor="">Email</label>
            <input type="text" />
          </div>
          <div className="field">
            <label htmlFor="">Address</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div className="field">
            <label htmlFor="">Pin Code</label>
            <input type="text" />
          </div>
        </div>
        <div className="col">
          <p>Bill Total</p>
          <div className="bill">
            <div className="item">
              <span>Bill Amount :</span>
              <span>
                {cart.reduce((acc, item) => {
                  return acc + item.quantity * products[item.id].price;
                }, 0)}
                .00
              </span>
            </div>
            <div className="item">
              <span>Delivery Charge :</span>
              <span>{deliveryType == "standard" ? 0 : 40}.00</span>
            </div>
            <div className="item">
              <span>
                <b>Total :</b>
              </span>
              <span>
                {cart.reduce(
                  (acc, item) => {
                    return acc + item.quantity * products[item.id].price;
                  },
                  deliveryType == "standard" ? 0 : 40
                )}
                .00
              </span>
            </div>
          </div>
          <button>Place Order and Pay</button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

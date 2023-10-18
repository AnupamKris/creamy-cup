const contact = () => {
  return (
    <div className="contact">
      <div className="title">
        <img src="/logo.png" alt="" />
        <h3>Contact Us</h3>
      </div>

      <div className="address">
        <img src="/map.png" alt="" />
        <div className="details">
          <h4>Address</h4>
          <p>Creamy Cup Coffee, Bangalore, India</p>
          <h4>Email</h4>
          <p>support@creamycup.co</p>
          <p>support@creamycup.co</p>
          <p>support@creamycup.co</p>
          <h4>Phone</h4>
          <p>+91 12345 65821</p>
        </div>
      </div>
      <div className="faq">
        <h2>Frequently Asked Questions.</h2>
        <div className="q">
          <h3>Q. How will I cancel an order?</h3>
          <p>
            Contact the customer care via the number or email and request for
            cancellation. If the order hasn't shipped yet, It can be cancelled.
          </p>
        </div>
        <div className="q">
          <h3>Q. How will I return an order?</h3>
          <p>
            Contact the customer care via the number or email and request for
            return along with the reason and proofs. Once approved, we'll send
            you a replacement.
          </p>
        </div>

        <div className="q">
          <h3>Q. Are the ingredients natural</h3>
          <p>
            All the Ingredients are natural and organic. We don't use any
            artificial flavours or preservatives. We carefully pick it from the
            coorg region
          </p>
        </div>
      </div>

      <div className="footer">
        <p>© 2023 Creamy Cup. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default contact;

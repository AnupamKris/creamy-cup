const contact = () => {
  return (
    <div className="contact">
      <div className="title">
        <img src="/logo.png" alt="" />
        <h3>Contact Us</h3>
      </div>

      <div className="address" style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"30px",padding:"20px",width:"100%"}}>




        <div className="details">
          <h4>Address</h4>
          <p>fssai Lic.No. 11219319000207</p>
          <p>MRS BEAN, Sunticoppa, Madikeri 571237, Karnataka, India</p>
          <h4>Email</h4>

          <p><a style={{textDecoration:"none",color:"black" }} href="mailto:contact@creamycup.co">contact@creamycup.co</a></p>
          <p><a style={{textDecoration:"none",color:"black" }} href="mailto:Sinancoorg35@gmail.com">Sinancoorg35@gmail.com</a></p>

          <h4>Phone</h4>
          <p><a style={{textDecoration:"none",color:"black" }} href="tel:917619494452">+91 76194 94452</a></p>
        </div>

        <div>
 <iframe
 id="if"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7791.91682493632!2d75.81823812757976!3d12.452490552155437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5073fbaab4009%3A0x7f713bcc70dde1ba!2sSuntikoppa%2C%20Karnataka%20571237!5e0!3m2!1sen!2sin!4v1697706028370!5m2!1sen!2sin"
     
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
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
          <h3>Q. Are the ingredients natural?</h3>
          <p>
            All the Ingredients are natural and organic. We don't use any
            artificial flavours or preservatives. We carefully pick it from the
            coorg region.
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

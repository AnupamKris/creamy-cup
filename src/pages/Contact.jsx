const contact = () => {
  return (
    <div className="contact">
      <div className="title">
        <img src="/logo.png" alt="" />
        <h3>Contact Us</h3>
      </div>

      <div
        className="address"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "30px",
          padding: "20px",
          width: "100%",
        }}
      >
        <div className="details">
          <h4>Address</h4>
          <p>fssai Lic.No. 11219319000207</p>
          <p>MRS BEAN, Sunticoppa, Madikeri 571237, Karnataka, India</p>
          <h4>Email</h4>

          <p>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="mailto:contact@creamycup.co"
            >
              contact@creamycup.co
            </a>
          </p>
          <p>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="mailto:Sinancoorg35@gmail.com"
            >
              Sinancoorg35@gmail.com
            </a>
          </p>

          <h4>Phone</h4>
          <p>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="tel:917619494452"
            >
              +91 76194 94452
            </a>
          </p>
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
      <div className="privacy">
        <div className="container">
          <h2>Privacy Policy</h2>
          <p>
            This privacy policy explains how Creamy Cup Coffee (“we”, “us”, or
            “our”) collects, uses, and shares your personal information when you
            visit or make a purchase from our website creamycup.co (“the Site”).
          </p>
          <h4>What info do we collect?</h4>
          <p>
            When you visit the Site, we automatically receive certain
            information about your device, such as your web browser, IP address,
            time zone, and some of the cookies that are installed on your
            device. Additionally, as you browse the Site, we collect information
            about the individual web pages or products that you view, what
            websites or search terms referred you to the Site, and information
            about how you interact with the Site. We refer to this
            automatically-collected information as “Device Information”. None of
            these data is stored in our servers.
          </p>
          <p>
            Additionally, when you make a purchase or attempt to make a purchase
            through the Site, we collect certain information from you, including
            your name, billing address, shipping address, payment information
            (including credit card numbers), email address, and phone number. We
            refer to this information as “Order Information”.
          </p>
          <h4>How Do We Use Your Personal Information?</h4>
          <p>
            We use the Order Information that we collect generally to fulfill
            any orders placed through the Site (including processing your
            payment information, arranging for shipping, and providing you with
            invoices and/or order confirmations). Additionally, we use this
            Order Information to:
            <ul>
              <li>Communicate with you</li>
              <li>Screen our orders for potential risk or fraud</li>
              <li>
                When in line with the preferences you have shared with us,
                provide you with information or advertising relating to our
                products or services.
              </li>
            </ul>
            We use the Device Information that we collect to help us screen for
            potential risk and fraud (in particular, your IP address), and more
            generally to improve and optimize our Site (for example, by
            generating analytics about how our customers browse and interact
            with the Site, and to assess the success of our marketing and
            advertising campaigns).
          </p>

          <h4>Data Retention</h4>
          <p>
            When you place an order through the Site, we will maintain your
            Order Information for our records unless and until you ask us to
            delete this information.
          </p>
          <h4>Changes</h4>
          <p>
            We may update this privacy policy from time to time in order to
            reflect changes to our practices or for other operational, legal or
            regulatory reasons.
          </p>
          <h4>Contact Us</h4>
          <p>
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e-mail at support@creamycup.co.
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

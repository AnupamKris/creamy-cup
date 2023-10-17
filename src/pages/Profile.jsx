const profile = () => {
  return (
    <div className="profile">
      <div className="container">
        <div className="profile-info">
          <div className="name">
            <div className="circle"></div>
            <h1>John Doe</h1>
          </div>

          <div className="field margin">
            <label htmlFor="">Phone</label>
            <input type="text" value="6369900860" />
          </div>
          <h3 className="margin">Change Password</h3>
          <div className="field">
            <label htmlFor="">Current Password</label>
            <input type="text" value="6369900860" />
          </div>
          <div className="field">
            <label htmlFor="">New Password</label>
            <input type="text" value="6369900860" />
          </div>
          <div className="field">
            <label htmlFor="">Repeat Password</label>
            <input type="text" value="6369900860" />
          </div>

          <button>Update Password</button>
        </div>
        <div className="orders">
          <div className="order">
            <div className="img">
              <img
                src="https://images.unsplash.com/photo-1580894732285-9d77c6f3f2d5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29vcmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                alt=""
              />
            </div>
            <div className="product-info">
              <div className="titular">
                <p>Coorg Special</p>
                <p>500</p>
              </div>
              <div className="order-status">
                <p>Ordered: 19/09/2021</p>
                <p>Status: Shipped</p>
              </div>
            </div>
            {/* <div className="order-status">
                <div className="line">
                  <div className="progress"></div>
                  <div className="point"></div>
                  <div className="point"></div>
                  <div className="point"></div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;

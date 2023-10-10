const Review = ({ review, star, username, date }) => {
  return (
    <div className="review">
      <div className="details">
        <p className="name">{username}</p>
        <p className="date">{date}</p>
      </div>

      <div className="rating">
        <p className="star">
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star-outline"></ion-icon>
        </p>
      </div>
      <p className="comment">{review}</p>
    </div>
  );
};

export default Review;

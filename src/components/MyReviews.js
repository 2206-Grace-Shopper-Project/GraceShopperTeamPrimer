import React, { useEffect, useState } from "react";
import { getMyReviews } from "../api";
import { EditReview } from "./";
import "./extra.css";

const MyReviews = ({ userDataObj, token }) => {
  const [myReviews, setMyReviews] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [clickId, setClickId] = useState("")

  const reviewArray = async () => {
    const userId = userDataObj.id;
    setMyReviews(await getMyReviews(userId, token));
  };

  useEffect(() => {
    reviewArray();
  }, [userDataObj.id]);

  const MappedReviews =
    myReviews.length > 0
      ? myReviews.map((review, index) => {
          let reviewId = review.id;
          let title = review.title;
          return (
            <div className="individualReviews" key={index}>
              <div>
                <b>Film: </b>
                {review.title}
              </div>
              <div>
                <b>Your Review: </b> {review.review}
              </div>
              <button
                onClick={(event) => {
                  setIsShown(true);
                  setClickId(`${reviewId}`)
                }}
              >
                Edit This Review
              </button>
              <div>
                <div>
                  {isShown && clickId ===`${reviewId}`? (
                    <EditReview
                      setIsShown={setIsShown}
                      myReviews={myReviews}
                      setMyReviews={setMyReviews}
                      title={review.title}
                      reviewId={reviewId}
                      reviewText={review.review}
                      token={token}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          );
        })
      : null;

  return (
    <div className="singleComponentBasics">
      <p className="singleComponentHeader">Yeah, yeah. Everyone's a critic.</p>
      <div>{myReviews.length > 0 ? MappedReviews : null}</div>
    </div>
  );
};

export default MyReviews;

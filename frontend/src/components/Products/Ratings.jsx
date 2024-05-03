import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Ratings = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={20}
          color="#279736"
          className="mr-[4pt] cursor-pointer"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          size={17}
          color="#279736"
          className="mr-[4pt] cursor-pointer"
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={i}
          size={20}
          color="#279736"
          className="mr-[4pt] cursor-pointer"
        />
      );
    }
  }
  return <div className="flex">{stars}</div>;
};

export default Ratings;

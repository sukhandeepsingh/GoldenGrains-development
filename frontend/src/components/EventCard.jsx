import React from "react";
import styles from "../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../server";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../redux/actions/cart";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already added to trolley!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to trolley successfully!");
      }
    }
  }
  return (
    <div
      className={`w-full block rounded-lg ${
        active ? "unset" : "mb-9"
      } md:flex p-2 border-[1pt] border-slate-600 md:max-h-[300pt]`}
    >
      <div className="w-full md:w-[40%] md:min-w-[350pt] lg:min-w-[400pt] max-h-[200pt] sm:max-h-[250pt] md:max-h-[285pt] m-auto flex justify-center items-center">
        <img src={`${backend_url}${data?.images[0]}`} alt="" className="flex w-full rounded-[8pt] md:w-[70%] lg:w-[80%] max-w-[400pt] max-h-[200pt] sm:max-h-[250pt] md:max-h-[285pt] object-cover p-6" />
      </div>
      <div className="w-full lg:w-[65%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              Rs. {data.originalPrice}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              Rs. {data.discountPrice}
            </h5>
          </div>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} !rounded-[4pt] !w-auto !p-4 !bg-[#3947c7] !h-[30pt] text-[#fff]`}>See details</div>
          </Link>
          <div className={`${styles.button} !rounded-[4pt] !w-auto !p-4 !bg-[#279736] !h-[30pt] text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

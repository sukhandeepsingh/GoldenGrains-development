import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  // const d = data.name;
  // const product_name = d.replace(/\s+/g, "-");

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already added to trolley!");
    } else {
      if (data.stock < 1) {
        toast.error("Not enough itemsin stock!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Added to trolley!");
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-[280pt] min-w-[195px] h-[400px] bg-transparent border-slate-400 border-[1pt] rounded-lg shadow-sm relative cursor-pointer flex flex-col hover:scale-[1.03] hover:shadow-xl transition-transform duration-200">
        <div className="w-full h-[55%] rounded-t-lg">
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            <img
              src={`${backend_url}${data.images && data.images[0]}`}
              alt=""
              className="w-full h-full object-contain rounded-t-lg"
            />
          </Link>
        </div>

        <div className="w-full h-[45%] px-2 py-3">
            <div className="flex mb-3 justify-between items-center">
              <div className=" w-[85%]">
              <Link
                to={`${
                  isEvent === true
                    ? `/product/${data._id}?isEvent=true`
                    : `/product/${data._id}`
                }`}
              >
              <h4 className="font-[500]">
                {data.name.length > 20
                  ? data.name.slice(0, 20) + "..."
                  : data.name}
              </h4>
              </Link>
              </div>
              <div className="flex w-[15%] justify-end items-center">
              {click ? (
                <AiFillHeart
                  size={22}
                  className="cursor-pointer"
                  onClick={() => removeFromWishlistHandler(data)}
                  color={click ? "red" : "#222"}
                  title="Remove from wishlist"
                />
              ) : (
                <AiOutlineHeart
                  size={22}
                  className="cursor-pointer"
                  onClick={() => addToWishlistHandler(data)}
                  color={click ? "red" : "#222"}
                  title="Add to wishlist"
                />
              )}
              </div>
            </div>
            <Link
              to={`${
                isEvent === true
                  ? `/product/${data._id}?isEvent=true`
                  : `/product/${data._id}`
              }`}
            >
            <div className="flex">
              <Ratings rating={data?.ratings} />
            </div>
            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center">
                <h4 className={`text-[12pt] text-[#444] line-through pr-2`}>
                  {data.originalPrice ? "Rs." + data.originalPrice : null}
                </h4>
                <h5 className={`text-[14pt] text-[#268032] font-[500]`}>
                  Rs.{" "}
                  {data.originalPrice === 0
                    ? data.originalPrice
                    : data.discountPrice}
                </h5>
              </div>
            </div>
          </Link>
          <div className="flex items-center">
            <button className="bg-[#279736] flex justify-between items-center hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full"
              onClick={() => addToCartHandler(data._id)}
              title="Add to trolley"
            >
              Add to trolley
              <AiOutlineShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

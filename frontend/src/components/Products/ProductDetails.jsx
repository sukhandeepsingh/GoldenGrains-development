import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import Loader from "../Layout/Loader";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [farmerData, setFarmerData] = useState({});
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }

    axios
      .get(`${server}/shop/get-shop-info/${data && data?.shop._id}`)
      .then((res) => {
        setFarmerData(res.data.shop);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to trolley successfully!");
      }
    }
  };

  // const totalReviewsLength =
  //   products &&
  //   products.reduce((acc, product) => acc + product.reviews.length, 0);

  // const totalRatings =
  //   products &&
  //   products.reduce(
  //     (acc, product) =>
  //       acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
  //     0
  //   );

  // const averageRating = (totalRatings / totalReviewsLength).toFixed(1) || 0;

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data?._id + user?._id;
      const userId = user?._id;
      const sellerId = data?.shop?._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res?.data?.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Login to contact farmer");
    }
  };
  return (
    <div className="">
      {data ? (
        <>
          <div
            className={`${styles.section} bg-[#ffffffe0] border-slate-200 border-[1pt] rounded-[10pt] px-4`}
          >
            {/* top area (images,name,des,price,message) */}
            <div className="w-full py-5">
              <div className="block w-full 800px:flex">
                {/* images */}
                <div className="w-full 800px:w-[50%] items-center justify-center">
                  <div className="flex w-[80%] h-[60%] justify-center">
                    <img
                      src={`${backend_url}${data && data.images[select]}`}
                      alt=""
                      className="w-auto max-h-[300pt] rounded-lg"
                    />
                  </div>
                  <div className="w-[80%] flex h-[40%] items-center justify-center">
                    {data &&
                      data?.images?.map((i, index) => (
                        <div
                          className={`${
                            select === i ? "border" : "null"
                          } cursor-pointer`}
                        >
                          <img
                            src={`${backend_url}${i}`}
                            alt=""
                            className={`h-[150px] overflow-hidden rounded-lg mr-3 mt-3 ${
                              select === index
                                ? "border-slate-600 scale-105"
                                : "border-slate-300"
                            } border-[1pt] object-fill`}
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                {/* data */}
                <div className="w-full 800px:w-[50%] pt-5">
                  <div className="flex justify-between">
                    <h1
                      className={`text-[25px] font-[500] mb-1 font-Roboto text-[#333]`}
                    >
                      {data.name}
                    </h1>
                    <div>
                      {click ? (
                        <AiFillHeart
                          size={25}
                          className="cursor-pointer"
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={25}
                          className="cursor-pointer"
                          onClick={() => addToWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mb-5">
                    <Ratings rating={data?.ratings} />{" "}
                    <span className="text-[10pt]">({data?.ratings}/5)</span>
                  </div>
                  <p className="w-full underline font-[600] text-[14pt]">
                    Description
                  </p>
                  <p>{data.description}</p>
                  <div className="flex pt-3 mt-3 items-baseline">
                    <h5 className={`text-[15pt] text-[#268032] font-[600]`}>
                      Rs.{" "}
                      {data.originalPrice === 0
                        ? data.originalPrice
                        : data.discountPrice}
                    </h5>
                    <h4 className={`text-[12pt] text-[#444] line-through pl-2`}>
                      {data.originalPrice ? "Rs." + data.originalPrice : null}
                    </h4>
                  </div>
                  <div className="flex items-center mt-12 justify-between pr-3">
                    <div>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                        {count}
                      </span>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className="text-white flex items-center">
                      Add to trolley <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                  <div className="flex items-center pt-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <img
                        src={`${backend_url}${farmerData?.avatar}`}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    </Link>
                    <div className="pr-8 block items-center">
                      <Link to={`/shop/preview/${farmerData?._id}`}>
                        <h3 className={`text-[#279736] text-[15px] pb-1 pt-1`}>
                          {farmerData?.name}
                        </h3>
                      </Link>
                      <h5 className="pb-3 text-[15px]">
                        ({farmerData?.rating} of 5) Ratings
                      </h5>
                    </div>
                    <button
                      className="bg-[#279736] flex justify-center items-center hover:bg-green-600 text-white py-2 my-3 px-4 rounded-[4pt]"
                      title="Contact farmer"
                      onClick={handleMessageSubmit}
                    >
                      Contact Farmer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* top area finish */}

          {/* details info */}
          <div className={`${styles.section} my-2 mt-10`}>
            <ProductDetailsInfo
              data={data}
              products={products}
              // totalReviewsLength={totalReviewsLength}
              // averageRating={averageRating}
              farmerData={farmerData}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  // totalReviewsLength,
  // averageRating,
  farmerData,
}) => {
  const [active, setActive] = useState(1);
  return (
    <div className="px-3 800px:px-10 py-2 rounded-lg bg-[#ffffffe0] border-slate-200 border-[1pt] min-h-[220pt]">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        {/* tab 1 */}
        <div className="relative">
          <h5
            className={`${
              active === 1 ? "text-[#279736]" : "text-[#000]"
            } text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator} !bg-[#279736]`} />
          ) : null}
        </div>

        {/* tab 2 */}
        <div className="relative">
          <h5
            className={`${
              active === 2 ? "text-[#279736]" : "text-[#000]"
            } text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator} !bg-[#279736]`} />
          ) : null}
        </div>

        {/* tab 3 */}
        <div className="relative">
          <h5
            className={`${
              active === 3 ? "text-[#279736]" : "text-[#000]"
            } text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(3)}
          >
            Farmer Details
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator} !bg-[#279736]`} />
          ) : null}
        </div>
      </div>

      {active === 1 ? (
        <>
          <p className="py-2 text-[16px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full flex flex-col items-center min-h-[40vh] mt-3 overflow-y-scroll">
          {data &&
            data?.reviews &&
            data?.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}/${item.user?.avatar}`}
                  alt=""
                  className="w-[40px] rounded-full"
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item?.comment}</p>
                </div>
              </div>
            ))}
          {data && data?.reviews?.length === 0 && (
            <h5>No reviews for this product yet.</h5>
          )}
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          {/* left half */}
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center w-fit">
              <Link to={`/shop/preview/${data?.shop?._id}`}>
                <div className="flex items-center">
                <img
                  src={`${backend_url}${farmerData?.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-3 block items-center">
                  <h3 className={`text-[#279736] pt-2 text-[15px] pb-1`}>
                    {farmerData?.name}
                  </h3>
                  <h5 className="pb-2 text-[15px]">
                    ({farmerData?.rating}/5) Ratings
                  </h5>
                </div>
                </div>
              </Link>
            </div>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          {/* right half */}
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {farmerData?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total products on store:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total reviews:{" "}
                <span className="font-[500]">{farmerData?.ratingCount}</span>
              </h5>
              <Link to={`/shop/preview/${data?.shop?._id}`}>
                <button
                  className="bg-[#279736] flex justify-center items-center hover:bg-green-600 text-white py-2 my-3 px-4 rounded-[4pt]"
                  title="View details"
                >
                  View details
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const {products} = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
      setData(res.data.shop);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    })
  }, []);


  const logoutHandler = async () => {
    await axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };
  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings = products && products.reduce((acc,product) => acc + product.reviews.reduce((sum,review) => sum + review.rating, 0),0);

  const averageRating = (totalRatings / totalReviewsLength).toFixed(1) || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img
                src={`${backend_url}${data.avatar}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{products && products.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Ratings</h5>
            <h4 className="text-[#000000a6]">{averageRating} of 5</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Member Since</h5>
            <h4 className="text-[#000000a6]">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings" >
              <div
                className={`${styles.button} !w-full !bg-[#279736] !h-[42px] !rounded-[5px]`}
              >
                <div className="text-white">Edit shop</div>
              </div>
              </Link>
              <div className="800px:hidden block">
                <Link to="/dashboard">
                  <div className={`${styles.button} !rounded-[4px] !bg-[#279736] !w-full !h-[42px]`}>
                    <span className="text-[#fff]">Go to Dashboard</span>
                  </div>
                </Link>
              </div>
              <div
                className={`${styles.button} !w-full !bg-[#279736] !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Logout of shop</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
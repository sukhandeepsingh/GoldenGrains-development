import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopFarmers } from "../../redux/actions/sellers";
import { backend_url } from "../../server";
import Ratings from "../Products/Ratings";
import { Link } from "react-router-dom";

const TopFarmers = () => {
  const { topFarmers } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopFarmers());
  }, []);

  return (
    <div className="w-full flex justify-center my-5">
      <div className="block w-11/12 justify-center bg-gradient-to-br from-slate-950 to-slate-600 p-6 rounded-lg">
        <div className="text-center text-3xl font-bold mb-8 text-[#fff]">
          Top Rated Farmers
          <div className="w-full flex justify-center items-center mt-5 mb-10">
            <hr className="w-[50%] text-[#fff]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topFarmers &&
            topFarmers.map((farmer) => (
              <div
                key={farmer._id}
                className="rounded-lg overflow-hidden min-w-[200px] hover:scale-[1.03] hover:shadow-xl transition-transform duration-200 hover:border-gray-600 hover:border-[1pt] p-2"
              >
                <Link to={`/shop/preview/${farmer._id}`}>
                  <img
                    src={`${backend_url}${farmer?.avatar}`}
                    alt={farmer?.name}
                    className="w-[100pt] h-[100pt] object-cover rounded-full"
                  />
                  <div className="p-4 bg-transparent">
                    <h3 className="text-lg font-medium mb-1 text-[#fff]">
                      {farmer?.name}
                    </h3>
                    <div className="flex items-center mb-2 text-[#fff]">
                      <Ratings rating={farmer?.rating} />
                      <span className="text-[#fff] pb-1">
                        ({farmer?.rating?.toFixed(1)})
                      </span>
                    </div>
                    <p className="mb-4 text-[#fff] text-justify">{farmer?.description?.length > 100 ? (<> {farmer?.description?.slice(0,101)} ... <span className="text-[11pt] text-gray-400">see more on shop page</span> </>) : farmer?.description}</p>
                    <div className="flex items-center justify-between text-sm text-[#fff]">
                      <span>Member Since: {farmer?.createdAt?.slice(0, 10)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopFarmers;

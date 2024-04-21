import React, { useState } from "react";
import styles from "../../styles/styles";
import { navItems, categoriesData } from "../../static/data";
import { Link, useLocation } from "react-router-dom";
import DropDown from "./DropDown";
import { useSelector } from "react-redux";

const Navbar = ({ active }) => {
  const { isSeller } = useSelector((state) => state.seller);
  const { pathname } = useLocation();
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className={`block 800px:${styles.normalFlex}`}>
      {/* <div>
          {
            navItems && navItems.map((i,index) => (
                <div className="flex">
                    <Link to={i.url}
                    className={`${pathname === "/" ? "text-[#17dd1f]" : "text-black 800px:text-[#279736]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer`}
                    >
                    {i.title}
                    </Link>
                </div>
            ))
        }
        </div> */}

      <div className="flex relative">
        <div className="flex cursor-pointer">
          <Link
            to="/"
            className={`${
              pathname === "/"
                ? "text-[#279736] 800px:text-[#279736] 800px:underline"
                : "text-black 800px:text-[#000]"
            } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer`}
          >
            Home
          </Link>
        </div>
        <div
          className="flex relative cursor-pointer"
          onMouseEnter={() => setDropDown(true)}
          onMouseLeave={() => setDropDown(false)}
        >
          <Link
            to="/categories"
            className={`${
              pathname === "/categories"
                ? "text-[#279736] 800px:text-[#279736] 800px:underline"
                : "text-black 800px:text-[#000]"
            } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer`}
          >
            Categories
          </Link>
          <div className="absolute">
          {dropDown ? (
            <DropDown
              categoriesData={categoriesData}
              setDropDown={setDropDown}
            />
          ) : null}
          </div>
        </div>
        <div className="flex cursor-pointer">
          <Link
            to="/products"
            className={`${
              pathname === "/products"
                ? "text-[#279736] 800px:text-[#279736] 800px:underline"
                : "text-black 800px:text-[#000]"
            } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer`}
          >
            Products
          </Link>
        </div>
        <div className="flex cursor-pointer">
          <Link
            to="/events"
            className={`${
              pathname === "/events"
                ? "text-[#279736] 800px:text-[#279736] 800px:underline"
                : "text-black 800px:text-[#000]"
            } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer`}
          >
            Events
          </Link>
        </div>
        <div className="flex cursor-pointer">
          <Link
            to="/faq"
            className={`${
              pathname === "/faq"
                ? "text-[#279736] 800px:text-[#279736] 800px:underline"
                : "text-black 800px:text-[#000]"
            } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer`}
          >
            FAQ
          </Link>
        </div>
        <div className="flex cursor-pointer">
          {isSeller ? (
            <Link to="/dashboard">
              <h1 className="text-[#000] flex px-6 items-center">
                Farmer Dashboard 
              </h1>
            </Link>
          ) : (
            <Link to="/shop-create">
              <h1 className="text-[#000] flex px-6 items-center">
                Register as Farmer 
              </h1>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

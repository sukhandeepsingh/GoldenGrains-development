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
    <div className={`block 800px:${styles.normalFlex} items-center`}>
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

      <div className="800px:flex relative items-center">
        <div className="flex cursor-pointer items-center">
          <Link
            to="/"
            className={`${
              pathname === "/"
                ? "text-[#279736] 800px:text-[#fff] 800px:bg-slate-900 800px:rounded-full 800px:h-[27px]"
                : "text-black 800px:text-[#000] 800px:border-slate-900 800px:rounded-full 800px:border-[1px]"
            } pb-[30px] 800px:pb-0 font-[500] px-4 cursor-pointer 800px:mr-[2pt]`}
          >
            Home
          </Link>
        </div>
        <div className="flex 800px:hidden relative cursor-pointer">
          <Link
            to="/categories"
            className={`${
              pathname === "/categories"
                ? "text-[#279736] 800px:text-[#fff] 800px:bg-slate-900 800px:rounded-full 800px:h-[27px]"
                : "text-black 800px:text-[#000] 800px:border-slate-900 800px:rounded-full 800px:border-[1px]"
            } pb-[30px] 800px:pb-0 font-[500] px-4 cursor-pointer 800px:mr-[2pt]`}
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
        <div
          className="hidden 800px:flex relative cursor-pointer"
          onMouseEnter={() => setDropDown(true)}
          onMouseLeave={() => setDropDown(false)}
        >
          <Link
            to="/categories"
            className={`${
              pathname === "/categories"
                ? "text-[#279736] 800px:text-[#fff] 800px:bg-slate-900 800px:rounded-full 800px:h-[27px]"
                : "text-black 800px:text-[#000] 800px:border-slate-900 800px:rounded-full 800px:border-[1px]"
            } pb-[30px] 800px:pb-0 font-[500] px-4 cursor-pointer 800px:mr-[2pt]`}
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
                ? "text-[#279736] 800px:text-[#fff] 800px:bg-slate-900 800px:rounded-full 800px:h-[27px]"
                : "text-black 800px:text-[#000] 800px:border-slate-900 800px:rounded-full 800px:border-[1px]"
            } pb-[30px] 800px:pb-0 font-[500] px-4 cursor-pointer 800px:mr-[2pt]`}
          >
            Products
          </Link>
        </div>
        <div className="flex cursor-pointer">
          <Link
            to="/events"
            className={`${
              pathname === "/events"
                ? "text-[#279736] 800px:text-[#fff] 800px:bg-slate-900 800px:rounded-full 800px:h-[27px]"
                : "text-black 800px:text-[#000] 800px:border-slate-900 800px:rounded-full 800px:border-[1px]"
            } pb-[30px] 800px:pb-0 font-[500] px-4 cursor-pointer 800px:mr-[2pt]`}
          >
            Events
          </Link>
        </div>
        <div className="flex cursor-pointer">
          <Link
            to="/faq"
            className={`${
              pathname === "/faq"
                ? "text-[#279736] 800px:text-[#fff] 800px:bg-slate-900 800px:rounded-full 800px:h-[27px]"
                : "text-black 800px:text-[#000] 800px:border-slate-900 800px:rounded-full 800px:border-[1px]"
            } pb-[30px] 800px:pb-0 font-[500] px-4 cursor-pointer 800px:mr-[2pt]`}
          >
            FAQ
          </Link>
        </div>
        <div className="hidden 800px:flex cursor-pointer 800px:border-slate-900 800px:rounded-full 800px:border-[1px]">
          {isSeller ? (
            <Link to="/dashboard" className="text-[#000] flex px-4 items-center pb-[30px] 800px:pb-0 font-[500]">
                Farmer Dashboard 
            </Link>
          ) : (
            <Link to="/shop-create" className="text-[#000] flex px-4 items-center pb-[30px] 800px:pb-0 font-[500]">
                Register as Farmer 
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

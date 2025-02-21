import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  // AiOutlineShop,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import SearchPopup from "./SearchPopup";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      {/* <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div className="h-[15%] w-[8%] -mt-8">
            <Link to="/">
              <img
                // src="https://i.ibb.co/Pg24SHR/weblogo.png"
                src="https://i.ibb.co/fzB2JRpC/weblogo.png"
                alt="Golden Grains"
              />
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="type here to search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    // const d = i.name;

                    // const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start py-3">
                          <img
                            src={`${backend_url}${i.images[0]}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`} style={{ width: "14%" }}>
            {isSeller ? (
              <Link to="/dashboard">
                <h1 className="text-[#fff] flex items-center">
                  Farmer Dashboard <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            ) : (
              <Link to="/shop-create">
                <h1 className="text-[#fff] flex items-center">
                  Register as Farmer <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            )}
          </div>
        </div>
      </div> */}

      <div className="flex w-full justify-center 800px:mt-4 800px:mb-7">
        <div className={`800px:flex 800px:w-[100%] 800px:rounded-[0px] 800px:border-slate-600 800px:border-b-[2pt]`}>
          <div
            className={`${
              active === true ? "shadow-sm top-0 left-0 z-10" : null
            } transition hidden 800px:flex items-center justify-between 800px:pb-3 w-full h-[70px]`}
          >
            <div
              className={`${styles.section} relative ${styles.normalFlex} justify-between`}
            >
              {/* categories */}
              {/* <div
            // onClick={() => setDropDown(!dropDown)}
            onMouseEnter={() => setDropDown(true)}
            onMouseLeave={() => setDropDown(false)}
          >
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-2 cursor-pointer"
                // onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div> */}
              <div className="w-[100px]">
                <Link to="/">
                  <img
                    // src="https://i.ibb.co/Pg24SHR/weblogo.png"
                    src="hhttps://i.ibb.co/fzB2JRpC/weblogo.png"
                    alt="Golden Grains"
                    className="w-[100px] h-auto"
                  />
                </Link>
              </div>

              {/* navitems */}
              <div className={`${styles.normalFlex} items-center`}>
                <Navbar active={activeHeading} />
              </div>

              {/* right most */}
              <div className="flex">
                <div className={`${styles.normalFlex}`}>
                  <div
                    className="relative cursor-pointer mr-[10px]"
                    onClick={() => setOpenSearch(true)}
                  >
                    <AiOutlineSearch size={35} className="fill-[#000] p-1" />
                  </div>
                </div>
                {openSearch ? (
                  <SearchPopup setOpenSearch={setOpenSearch} />
                ) : null}

                <div className={`${styles.normalFlex}`}>
                  <div
                    className="relative cursor-pointer mr-[10px]"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart size={35} className="fill-[#000] p-1" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#4359d6] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>

                <div className={`${styles.normalFlex}`}>
                  <div
                    className="relative cursor-pointer mr-[05px]"
                    onClick={() => setOpenCart(true)}
                  >
                    <AiOutlineShoppingCart size={35} className="fill-[#000] p-1" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#4359d6] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {cart && cart.length}
                    </span>
                  </div>
                </div>

                <div className={`${styles.normalFlex}`}>
                  <div className="relative cursor-pointer">
                    {/* {isAuthenticated ? ( */}
                      <Link to={isAuthenticated ? "/profile" : "/login"}>
                        {/* <img
                          src={`${backend_url}${user.avatar}`}
                          className="w-[35px] h-[35px] rounded-full aspect-square flex-shrink-0"
                          alt=""
                        /> */}
                        <AiOutlineUser size={`${pathname === "/profile" ? 32 : 35}`} className={`${pathname === "/profile" ? "fill-[#fff] bg-[#000] rounded-full" : "fill-[#000]"} p-1`} />
                      </Link>
                    {/* ) : (
                      <Link to="/login">
                        <AiOutlineUser size={30} className="fill-[#000]" />
                      </Link>
                    )} */}
                  </div>
                </div>

                {/* cart popup */}
                {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
                {/* wishlist popup */}
                {openWishlist ? (
                  <Wishlist setOpenWishlist={setOpenWishlist} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full h-[52pt] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full h-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="w-[100px] h-auto flex items-center">
            <Link to="/">
              <img
                // src="https://i.ibb.co/Pg24SHR/weblogo.png"
                src="https://i.ibb.co/fzB2JRpC/weblogo.png"
                alt="Golden Grains"
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[17pt]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#40c13b] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        </div>

        {/* hamburger menu */}
        {/* wishlist popup */}
        {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#40c13b] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {Wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>
              {/* searchbar */}
              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search  for products..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0].url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* navigation components */}
              <Navbar active={activeHeading} />
              <div
                className={`${styles.button} ml-4 w-auto max-w-[200px] !rounded-[4px]`}
              >
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Register as a Farmer <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <div className="flex w-full ml-4 pt-[30px]">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile" className="flex">
                      <img
                        src={`${backend_url}${user.avatar}`}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full"
                      />{" "}
                      <span className="align-middle ml-4 pt-[5%]">
                        Manage account
                      </span>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="text-[16px] pr-[4px]">
                      Login /
                    </Link>
                    <Link to="/sign-up" className="text-[16px]">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

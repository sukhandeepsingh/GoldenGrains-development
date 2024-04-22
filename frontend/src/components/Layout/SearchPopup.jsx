import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";

const SearchPopup = ({ setOpenSearch }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);

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

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full bg-[#00000085] h-screen z-10 justify-center flex"
        onClick={() => setOpenSearch(false)}
      ></div>
      <div className="h-[80px] top-3 left-0 z-20 justify-center flex w-full fixed">
        <div className="fixed h-[75px] w-[95%] bg-slate-50 flex items-center justify-between z-30 rounded-[10px] border-[1px] border-slate-600">
          <div className="w-[20%]"></div>
          <div className="relative w-[60%]">
            <input
              type="text"
              placeholder="type here to search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 !bg-[#fff] border-slate-600 border-[2px] rounded-md focus:border-none"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
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
          {/* closing search */}
          <div className="flex w-[20%] justify-end pr-5 relative right-3">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenSearch(false)}
            />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default SearchPopup;

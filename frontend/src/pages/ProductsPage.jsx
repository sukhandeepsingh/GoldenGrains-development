import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";
import axios from 'axios';
import { server } from "../server";
import { categoriesData } from "../static/data";

const ProductsPage = () => {
  // const [searchParams] = useSearchParams();
  // const categoryData = searchParams.get("category");
  // const { allProducts } = useSelector((state) => state.products);
  // // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (categoryData === null) {
  //     var arr = allProducts && [...allProducts];
  //     const d = arr && arr.sort((b, a) => a.sold_out - b.sold_out);

  //     setData(d);
  //   } else {
  //     const d =
  //     allProducts && allProducts.filter((i) => i.category === categoryData);
  //     setData(d);
  //   }
  // }, [allProducts]);

  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  // const { allProducts } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Change as needed
  const [currentProducts, setCurrentProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${server}/product/get-all-products-main?page=${currentPage}&limit=${productsPerPage}`;
        if (selectedCategories) {
          url += `&category=${selectedCategories.join(",") || categoryData || ""}`;
        }
        if (selectedSort) {
          url += `&sort=${selectedSort}`;
        }
        const res = await axios.get(url);
        setCurrentProducts(res.data.products);
        setCount(res.data.count);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage, productsPerPage, selectedCategories, count, selectedSort]);

  // const totalPages = Math.ceil(allProducts?.length / productsPerPage);
  const totalPages = Math.ceil(count / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const handleCategoryChange = (category) => {
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      const updatedCategories = [...selectedCategories];
      updatedCategories.splice(index, 1);
      setSelectedCategories(updatedCategories);
    }
  };

  // useEffect(() => {
  //   // Fetch categories data from backend and set to state
  //   const fetchCategories = async () => {
  //     // Example: fetch categories from backend
  //     const response = await fetch("/api/categories");
  //     const data = await response.json();
  //     // Assuming data is an array of category objects
  //     // Set categories to state
  //     setCategories(data);
  //   };

  //   fetchCategories();
  // }, []);

  return (
    // <div>
    //   <Header activeHeading={3} />
    //   <br />
    //   <div className="w-full flex justify-center">
    //     <div className={`${styles.section}`}>
    //       <h1 className={`${styles.heading} w-[180pt] justify-center flex`}>
    //         <span>All Products</span>
    //       </h1>
    //     </div>
    //   </div>

    //   {/* <div className={`${styles.section}`}>
    //     <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
    //       {
    //         data && data.map((i,index) => <ProductCard data={i} key={index} />)
    //       }
    //     </div>
    //     {
    //         data && data.length === 0 ? (
    //           <h1 className="text-center w-full pb-[100px] text-[20px]">
    //             No Farmers selling any products in this category as of now. Please check later.
    //           </h1>
    //         ) : null
    //       }
    //   </div> */}

    //   </div>

    //   <Footer />
    // </div>

    <div>
      <Header activeHeading={3} />

      <div className="block 800px:flex w-[98%] mx-auto">

      {/* left side */}
      <div className="flex flex-col 800px:w-[20%] justify-start items-start px-4 border-r border-gray-300 mb-6">
        <h2 className="text-lg font-semibold mb-2">Filter by Category</h2>
        <div className="flex flex-col gap-1">
          {categoriesData && categoriesData.map((category) => (
            <label key={category.id} className="inline-flex items-center cursor-pointer hover:bg-[#27973633] px-2 hover:scale-[1.01] transition-all">
              <input
                type="checkbox"
                className={`form-checkbox h-5 w-5 accent-[#279736] cursor-pointer rounded-full`}
                value={category.title}
                checked={selectedCategories.includes(category.title)}
                onChange={() => handleCategoryChange(category.title)}
              />
              <span className={`ml-2 ${selectedCategories.includes(category.title) ? 'text-[#279736]' : ''}`}>{category.title}</span>
            </label>
          ))}
        </div>
        {/* <button
          onClick={() => console.log("Apply filters")} // Update with actual functionality
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Apply Filters
        </button> */}
      </div>

      
      {/* right side */}
      <div className="block 800px:w-[85%] mx-auto">
        <div className="w-full flex justify-center">
          <div className={`w-11/12 mx-auto flex justify-between items-start mb-[10pt]`}>
            <h1 className={`text-[25px] text-center md:text-start font-[600] font-Roboto flex`}>
              <span>All Products</span>
            </h1>
            {/* Sort dropdown */}
            <div>
            <div>
            <label htmlFor="sort" className="mr-2 text-lg font-semibold">
              Sort By:
            </label>
            </div>
            <select
              id="sort"
              className="border rounded-md p-1 min-w-[100pt]"
              value={selectedSort}
              onChange={handleSortChange}
            >
              <option value="">None</option>
              <option value="name_asc">Name (ascending)</option>
              <option value="name_dec">Name (descending)</option>
              <option value="price_asc">Price (ascending)</option>
              <option value="price_dec">Price (descending)</option>
            </select>
            </div>
          </div>
        </div>

      <div className={`w-11/12 mx-auto`}>
        <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 md:gap-[20px] lg:grid-cols-4 lg:gap-[20px] mb-8">
          {currentProducts && currentProducts?.map((product, index) => (
            <ProductCard data={product} key={index} />
          ))}
        </div>
        {currentProducts && currentProducts.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No Farmers selling any products in this category as of now. Please
            check later.
          </h1>
        ) : null}
      </div>

      {/* pagination */}

      {totalPages ? (
        <div className="flex justify-center my-6">
           <nav>
             <ul className="flex">
               <li>
                 <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border h-[30pt] border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#279736] focus:ring-offset-2"
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    page === currentPage ||
                    page === currentPage - 1 ||
                    page === currentPage + 1 ||
                    (currentPage <= 4 && page <= 5) ||
                    (currentPage >= totalPages - 3 && page >= totalPages - 4) ||
                    (currentPage >= 4 &&
                      currentPage <= totalPages - 3 &&
                      Math.abs(currentPage - page) <= 1)
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    <div className="flex items-center">
                      {index === 1 && currentPage > 4 && (
                        <li>
                          <span className="px-3 py-2 h-[30pt] flex items-center border border-gray-300 bg-white text-sm font-medium text-gray-800 align-middle">
                            ...
                          </span>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={() => paginate(page)}
                          className={`px-4 py-2 h-[30pt] border border-gray-300 ${
                            currentPage === page
                              ? "bg-[#279736] text-white"
                              : "bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#279736] focus:ring-offset-2"
                          }`}
                        >
                          {page}
                        </button>
                      </li>
                      {index === array.length - 2 &&
                        currentPage < totalPages - 3 && (
                          <li>
                            <span className="px-3 py-2 h-[30pt] flex items-center border border-gray-300 bg-white text-sm font-medium text-gray-700 align-middle">
                              ...
                            </span>
                          </li>
                        )}
                    </div>
                  </React.Fragment>
                ))}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 h-[30pt] border border-gray-300 rounded-r-md bg-white text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#279736] focus:ring-offset-2"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center my-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border h-[30pt] border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#279736] focus:ring-offset-2"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 h-[30pt] border border-gray-300 rounded-r-md bg-white text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#279736] focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      )}

      {/* pagination ends */}
      </div>

      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;

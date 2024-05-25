import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../../server";
import { Link } from "react-router-dom";
// import { productData } from "../../../static/data";

const FeaturedProduct = () => {
  // const {allProducts} = useSelector((state) => state.products);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`${server}/product/get-all-products-main?limit=5`);
        setFeaturedProducts(res.data.products)
      } catch (error) {
        toast.error("error getting products");
      }
    }
    fetchFeatured();
  }, [ featuredProducts])
  

  return (
    <div>
      <div className={`${styles.section}`}>
      <div className={`flex justify-between items-center`}>
        <div className={`text-[27px] text-center md:text-start font-[600] font-Roboto`}>
          <h1>Featured Products</h1>
        </div>
        <div
            className={`${styles.button} !h-[32pt] !bg-[#279736] !text-[#fff] !w-auto !px-2 !rounded-[5pt]`}
          >
            <Link to="/products">See All Products</Link>
          </div>
      </div>
        {
          featuredProducts && featuredProducts.length !== 0 && (
            <>
              <div className="grid place-items-center grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 md:gap-[15pt] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                {featuredProducts &&
                  featuredProducts.map((i, index) => <ProductCard data={i} key={index} />)}
              </div>
            </>
          )
        }
        {
          featuredProducts && featuredProducts.length === 0 && (
            <>
              <div className="md-3 text-[18px] text-center w-full flex justify-center items-center bg-[#fff] rounded-md min-h-[100px]">
                <div className="w-full my-[25px] flex justify-center items-center">
                  <h4>
                    There are currently no products running on the website. But many
                    are on the way... Come back later.
                  </h4>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

export default FeaturedProduct;

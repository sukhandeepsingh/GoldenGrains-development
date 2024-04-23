import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
// import { productData } from "../../../static/data";

const FeaturedProduct = () => {
  const {allProducts} = useSelector((state) => state.products);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid place-items-center grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 md:gap-[15pt] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {
            allProducts && allProducts.length !== 0 ? (
              <>
                {allProducts &&
                  allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            ) : (
              <>
                <div className="md-3 text-[18px] text-center w-full bg-[#fff] rounded-md min-h-[100px]">
                  <div className="w-full my-[25px]">
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
    </div>
  );
};

export default FeaturedProduct;

import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const SuggestedProduct = ({ data }) => {
  const {allProducts} = useSelector((state) => state.products);
  const [productData, setProductData] = useState();

  useEffect(() => {
    const d =
    allProducts &&
    allProducts.filter((i) => i.category === data.category);
    setProductData(d);
  }, []);

  return (
    <div>
      {data ? (
        <div className={`${styles.section} p-4`}>
          <h2
            className={`text-center md:text-start font-[600] font-Roboto pb-[15px] text-[25px] font[500] border-b mb-5`}
          >
            Other Products in this category
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {
                productData && productData.map((i,index) => (
                    <ProductCard data={i} key={index} />
                )).slice(0,5)
            }
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;

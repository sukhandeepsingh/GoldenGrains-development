import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";

const ProductsPage = () => {
  const [ searchParams ] = useSearchParams();
  const categoryData = searchParams.get("category");
  const {allProducts} = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      var arr = allProducts && [...allProducts];
      const d = arr && arr.sort((b, a) => a.sold_out - b.sold_out);
      
      setData(d);
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts]);
  

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <div className="w-full flex justify-center">
        <div className={`${styles.section}`}>
            <h1 className={`${styles.heading} w-[180pt] justify-center flex`}>
                <span>All Products</span>
            </h1>
        </div>
      </div>
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {
            data && data.map((i,index) => <ProductCard data={i} key={index} />)
          }
        </div>
        {
            data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No Farmers selling any products in this category as of now. Please check later.
              </h1>
            ) : null
          }
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;

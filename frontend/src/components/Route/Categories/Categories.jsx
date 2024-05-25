import React from "react";
import styles from "../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-8 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={`${styles.section} flex justify-between items-center`}>
        <div className={`text-[27px] text-center md:text-start font-[600] font-Roboto`}>
          <h1>Categories</h1>
        </div>
        <div
            className={`${styles.button} !h-[32pt] !bg-[#279736] !text-[#fff] !w-auto !px-2 !rounded-[5pt]`}
          >
            <Link to="/categories">See All Categories</Link>
          </div>
      </div>
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-8`}
        id="categories"
      >
        <div className="grid place-items-center grid-cols-1 gap-[5px] sm:grid-cols-2 md:grid-cols-3 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full h-[180px] border-slate-600 border-[1pt] rounded-[8pt] flex items-center justify-center cursor-pointer overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-200"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <div className="flex flex-col justify-center">
                    <div>
                      <img
                        src={i.image_Url}
                        className="w-[120px] object-contain aspect-square"
                        alt=""
                      />
                    </div>
                    <div className="w-full flex justify-center">
                      <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                    </div>
                  </div>
                </div>
              );
            }).slice(0,5)}
        </div>
      </div>
    </>
  );
};

export default Categories;

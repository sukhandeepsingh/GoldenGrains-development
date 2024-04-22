import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { categoriesData } from "../static/data";
import { useNavigate } from "react-router-dom";
import styles from "../styles/styles";

const CategoriesPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <div className="w-full flex justify-center">
        <div className={`${styles.section}`}>
            <h1 className={`${styles.heading} w-[180pt] bg-white justify-center flex -mb-2 rounded-t-lg`}>
                <span className="pt-[4pt]">All Categories</span>
            </h1>
        </div>
      </div>
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-1`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full h-[180px] border-slate-600 border-[1pt] rounded-[8pt] flex items-center justify-center cursor-pointer overflow-hidden"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <div className="flex flex-col justify-center">
                    <div>
                      <img
                        src={i.image_Url}
                        className="w-[120px] object-cover aspect-square"
                        alt=""
                      />
                    </div>
                    <div className="w-full flex justify-center">
                      <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default CategoriesPage;

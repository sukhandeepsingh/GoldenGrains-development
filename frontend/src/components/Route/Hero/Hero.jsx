import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex 800px:w-[96%] 800px:border-slate-600 800px:border-[1px] 800px:rounded-[10px]">
        <div
        className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full rounded-[10px] bg-no-repeat ${styles.normalFlex}`}
        style={{
          backgroundImage:
            "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
        }}
      >
        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
          <h1
            className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
          >
            Best Collection <br /> of Farm Products
          </h1>
          <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem non iste
            ab eveniet voluptatibus fugiat rerum placeat doloremque amet atque vel
            sint, minima, ut quaerat illum provident aut blanditiis explicabo.
          </p>
          <Link to="/products" className="inline-block">
              <div className={`${styles.button} mt-5`}>
                  <span className="text-[#fff] font-[Poppins] text-[18px]">
                      Shop now
                  </span>
              </div>
          </Link>
        </div>
      </div>
        </div>
      </div>
    
    </>
  );
};

export default Hero;

import React from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const ShopHomePage = () => {
  return (
    <div>
      <Header />
      <div className="w-full flex justify-center">
      <div className={`w-11/12`}>
        <div className="w-full 800px:flex py-10 justify-between">
          <div className="800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm 800px:h-auto 800px:sticky top-10 left-0 z-10">
            <ShopInfo isOwner={true} />
          </div>
          <div className="800px:w-[72%] mt-5 800px:mt-['unset'] rounded-[4px]">
            <ShopProfileData isOwner={true} />
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopHomePage;

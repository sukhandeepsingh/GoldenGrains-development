import React, { useEffect } from "react";
import ForgotPasswordFarmer from "../../components/Shop/ForgotPasswordFarmer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgotPasswordFarmerPage = () => {
  const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading,isSeller]);
  return (
    <div>
      <ForgotPasswordFarmer />
    </div>
  );
};

export default ForgotPasswordFarmerPage;

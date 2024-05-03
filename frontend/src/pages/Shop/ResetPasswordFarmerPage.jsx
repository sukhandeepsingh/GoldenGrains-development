import React, { useEffect } from "react";
import ResetPasswordFarmer from "../../components/Shop/ResetPasswordFarmer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ResetPasswordFarmerPage = () => {
  const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading,isSeller]);
  return (
    <div>
      <ResetPasswordFarmer />
    </div>
  );
};

export default ResetPasswordFarmerPage;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForgotPasswordUser from "../components/Login/ForgotPasswordUser";

const ForgotPasswordUserPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <ForgotPasswordUser />
    </div>
  );
};

export default ForgotPasswordUserPage;

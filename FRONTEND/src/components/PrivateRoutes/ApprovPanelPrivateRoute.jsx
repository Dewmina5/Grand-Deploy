import React from "react";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ApprovPanelPrivateRoute = () => {
  const userInfoString = localStorage.getItem("UserInfo");
  const storedUserInfo = JSON.parse(userInfoString);
  console.log(userInfoString);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfoString) {
      if (
        storedUserInfo.UserType == "Admin" && (storedUserInfo.UnivercityPosition == "Department Head" ||
          storedUserInfo.UnivercityPosition == "Vice Chancellor" ||
          storedUserInfo.UnivercityPosition == "Faculty Head")
      ) {
        navigate("/aprove-home");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return <Outlet />;
};

export default ApprovPanelPrivateRoute;

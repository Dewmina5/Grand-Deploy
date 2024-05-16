import React, { useState, useEffect } from "react";
import "./UserSideBar.css";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { getImageUrl } from "../../utils";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function UserSidebar({ sidebarActive, toggleSidebar }) {
  const [isActive, setIsActive] = useState(sidebarActive);

  const userInfoString = localStorage.getItem("UserInfo");
  const storedUserInfo = JSON.parse(userInfoString);

  useEffect(() => {
    setIsActive(sidebarActive);
  }, [sidebarActive]);

  function handleSignOut() {
    localStorage.removeItem("UserInfo");
    window.location.href = "/";
  }
  return (
    <div id="SideNavigation">
      <div className={`sidebar ${isActive ? "active" : ""}`}>
        <div className="sidebar">
          <div className="logo_content">
            <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
            <div className="logo">
              <div className="logo_name">
                <Link to={"/"}>
                  <img
                    className="component-3-icon"
                    alt=""
                    src={getImageUrl("NAV/logo.png")}
                  />
                </Link>
              </div>
            </div>
          </div>

          <ul className="nav_list">
            
              <li >
                <Link to={""} >
                  <i><img src="https://www.shutterstock.com/image-vector/pen-filling-application-form-apply-600nw-2246161303.jpghttps://www.shutterstock.com/image-vector/pen-filling-application-form-apply-600nw-2246161303.jpg" style={{width: '90%',borderRadius: '50%'}}></img></i>
                  <span className="link-name">My Form</span>
                </Link>
                <div className="tooltip">My Form</div>
              </li>
           
          </ul>
          <Link to="/admin-nav/profile">
            <div className="profile_content">
              <div className="profile">
                <div className="profile_details">
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      alt={storedUserInfo && storedUserInfo.FirstName}
                      src="/static/images/avatar/1.jpg"
                    />
                  </StyledBadge>
                  <div className="name_job">
                    <div className="name">{storedUserInfo && storedUserInfo.FirstName}</div>
                    <div className="">
                      <span style={{ color: "#7C7C7C" }}>
                        {" "}
                        {storedUserInfo && storedUserInfo.UnivercityPosition === "Other" ? storedUserInfo.AdminisrationPosition : storedUserInfo.UnivercityPosition  }
                      </span>
                    </div>
                  </div>
                </div>
                <i
                  className="bx bx-log-out"
                  id="log_out"
                  style={{ textDecoration: "none", color: "white" }}
                  onClick={handleSignOut}
                ></i>
              </div>
            </div>
          </Link>
        </div>

        <div className="home_content"></div>
      </div>
    </div>
  );
}

export default UserSidebar;

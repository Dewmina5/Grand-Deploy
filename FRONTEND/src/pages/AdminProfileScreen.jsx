import React, { useState } from "react";
import styles from "../styles/AdminProfile.module.css";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import AdminSidebar from "../components/AdminSideBar/AdminSidebar";
import AdminProfile from "../components/profile/AdminProfile";

export default function AdminProfileScreen() {
  const userInfoString = localStorage.getItem("UserInfo");
  const storedUserInfo = JSON.parse(userInfoString);
  console.log(userInfoString);

  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  let customNavLinks = [
    { href: "/admin-nav", label: "Home" },
    { href: "/admin-nav", label: "Dashboard" },
    { href: "/admin-nav/user-table", label: "Users" },
    { href: "/admin-nav/registration", label: "Profile" },
  ];

  let navLinks = [
    { name: "Dashboard", icon: "bx-grid-alt", path: "/" },
    { name: "Users", icon: "bx-user", path: "/admin-nav/user-table" },
  ];

  if (
    storedUserInfo.UserType === "Admin" &&
    (storedUserInfo.UnivercityPosition === "Department Head" ||
      storedUserInfo.UnivercityPosition === "Vice Chancellor" ||
      storedUserInfo.UnivercityPosition === "Faculty Head")
  ) {
    customNavLinks = [
      { href: "/aprove-home", label: "Home" },
      { href: "/aprove-home", label: "Dashboard" },

      // Add additional links for Admin
    ];

    navLinks = [
      { name: "Dashboard", icon: "bx-grid-alt", path: "" },
      { name: "Pending-Aplication", icon: "bxs-edit", path: "" },
      // Add additional links for Admin
    ];
  }

  return (
    <div className={styles.bodyD}>
      <div>
        <AdminSidebar
          sidebarActive={sidebarActive}
          toggleSidebar={toggleSidebar}
          navLinks={navLinks}
        />
      </div>

      <div
        style={{
          marginTop: "25px",
          marginLeft: sidebarActive ? "250px" : "80px",
          justifyContent: sidebarActive ? "center" : "right",
          transition: " all 0.6s ease",
        }}
      >
        <AdminHeader customNavLinks={customNavLinks} />
        <AdminProfile />
      </div>
    </div>
  );
}

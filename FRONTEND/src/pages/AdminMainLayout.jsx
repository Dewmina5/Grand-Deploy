import React, { useState } from "react";
import AdminSidebar from "../components/AdminSideBar/AdminSidebar";
import styles from "../styles/AdminMainLayout.module.css";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader/AdminHeader";

export default function AdminMainLayout() {
  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const customNavLinks = [
    { href: "/admin-nav", label: "Home" },
    { href: "/admin-nav", label: "Dashboard" },
  ];

  const navLinks = [
    { name: "Dashboard", icon: "bx-grid-alt", path: "/admin-nav" },
    { name: "Users", icon: "bx-user", path: "/admin-nav/user-table" },
  ];

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
          transition: " all 0.6s ease",
        }}
      >
        <AdminHeader customNavLinks={customNavLinks} />
        <br />
        <Outlet />
      </div>
    </div>
  );
}

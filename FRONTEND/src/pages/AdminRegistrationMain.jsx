import React, { useState } from "react";
import styles from "../styles/AdminRegistrationMain.module.css";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import AdminSidebar from "../components/AdminSideBar/AdminSidebar";
import RegistrationScreen from "./RegistrationScreen";

export default function AdminRegistrationMain() {
  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const customNavLinks = [
    { href: "/admin-nav", label: "Home" },
    { href: "/admin-nav", label: "Dashboard" },
    { href: "/admin-nav/user-table", label: "Users" },
    { href: "/admin-nav/registration", label: "Registration" },
  ];

  const navLinks = [
    { name: "Dashboard", icon: "bx-grid-alt", path: "/" },
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
        <RegistrationScreen />
      </div>
    </div>
  );
}

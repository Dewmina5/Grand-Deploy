import React, { useState } from "react";
import styles from "../styles/AdminUserTablePage.module.css";
import AdminSidebar from "../components/AdminSideBar/AdminSidebar";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import ApproveList from "../components/Table/ApproveListYable/ApproveList";

export default function AprooveCominityGrantList() {
  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const customNavLinks = [
    { href: "/aprove-home", label: "Home" },
    { href: "/aprove-home", label: "Dashboard" },
    { href: "/aprove-home/Aplicant-list", label: "Aplicant" },
  ];
  const navLinks = [
    { name: "Dashboard", icon: "bx-grid-alt", path: "/aprove-home" },
    {
      name: "Pending-Aplication",
      icon: "bxs-edit",
      path: "/aprove-home/Aplicant-list",
    },
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
        <ApproveList />
      </div>
    </div>
  );
}

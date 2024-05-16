import React, { useState, useEffect } from "react";
import styles from "../styles/AdminUserTablePage.module.css";
import AdminSidebar from "../components/AdminSideBar/AdminSidebar";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import ApproveProgres from "../components/AproveProgress/ApproveProgres";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function AproveSheet() {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [user, setUsers] = useState("");
  const id = useParams();
  console.log(id.id);

  useEffect(() => {
    function fetchUserDetails() {
      axios
        .get("http://localhost:8000/api/grant/view-single-application/" + id.id)
        .then((res) => {
          console.log(res.data.GrantAplication);
          setUsers(res.data.GrantAplication);

          toast.success("Data Fetched!", {
            duration: 3000, // 3 seconds
            position: "top-right", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchUserDetails();
  }, [id]);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const customNavLinks = [
    { href: "/aprove-home", label: "Home" },
    { href: "/aprove-home", label: "Dashboard" },
    { href: "/aprove-home/Aplicant-list", label: "Aplicants" },
    {
      href: "/approve-home",
      label: "Grant Application",
    },
    {
      href: "/approve-home",
      label: user
        ? "Mr." + user.firstName + " " + user.familyName
        : "Loading...",
    },
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
        <ApproveProgres />
      </div>
    </div>
  );
}

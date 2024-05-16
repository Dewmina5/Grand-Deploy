import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./navbar.module.css";
import { getImageUrl } from "../../utils";
import { Outlet } from "react-router-dom";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import IconButton from "@mui/material/IconButton";

function Navigation() {

  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);
  return (
    <>
      <Navbar
        id={styles.Container}
        className="navbar navbar-light fixed-top"
        style={{ backgroundColor: "#17376e" }}
        expand="sm"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              className={styles.logoIcon}
              alt="logo image"
              src={getImageUrl("NAV/logo.png")}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={styles.navbarTogglerIcon}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className={styles.navlink}>
                HOME
              </Nav.Link>
              <Nav.Link href="/form" className={styles.navlink}>

              </Nav.Link>
              <Nav.Link href="#aboutus" className={styles.navlink}>
                ABOUT US
              </Nav.Link>
              <Nav.Link href="/contact-us" className={styles.navlink}>
                CONTACT US
              </Nav.Link>
            </Nav>
            {userInfoString ? (
              <>
                {storedUserInfo.UserType == "User" ? (
                  <>
                    <Nav.Link href="/viewForm" className={styles.navlink}>
                      <div className={styles.hovdash}>
                        Dashboard
                      </div>
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    {storedUserInfo.UserType == "Admin" && (storedUserInfo.UnivercityPosition == "Department Head" ||
                      storedUserInfo.UnivercityPosition == "Vice Chancellor" ||
                      storedUserInfo.UnivercityPosition == "Faculty Head") ? (
                      <>
                        <Nav.Link href="/aprove-home" className={styles.navlink}>
                          <div className={styles.hovdash}>
                            Dashboard
                          </div>
                        </Nav.Link>
                      </>) : (
                      <>
                        {storedUserInfo.UserType === 'Admin' && storedUserInfo.UnivercityPosition == 'Other' && storedUserInfo.AdminisrationPosition != 'Interview Panel' ? (
                          <>
                            <Nav.Link href="/admin-nav" className={styles.navlink}>
                              <div className={styles.hovdash}>
                                Dashboard
                              </div>
                            </Nav.Link>
                          </>) : (<></>)}
                      </>)}
                  </>
                )}


              </>) : (
              <>
                <Nav.Link href="/login" className={styles.navlink}>
                  <IconButton aria-label="delete" disabled color="secondary">
                    <LoginSharpIcon style={{ color: "WHITE" }} />
                  </IconButton>
                </Nav.Link>
              </>
            )}

          </Navbar.Collapse>

        </Container>
      </Navbar>

      <Outlet />
      <div className={styles.divStyles}>
        <p>Profile</p>
      </div>
    </>
  );
}

export default Navigation;

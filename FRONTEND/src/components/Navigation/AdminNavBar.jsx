import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./AdminNav.module.css";
import { getImageUrl } from "../../utils";
import { Outlet } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function AdminNavBar() {
  return (
    <div>
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
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className={`ms-auto ${styles.navbarNav}`}>
            <Nav.Link
                href="/admin-nav"
                className={styles.navlink}
              >
                HOME
              </Nav.Link>
              <Nav.Link
                href="/admin-nav/registration"
                className={styles.navlink}
              >
                ADD USERS
              </Nav.Link>
              <Nav.Link href="#aboutus" className={styles.navlink}>
                GRANT PROGRESS
              </Nav.Link>
              <Nav.Link href="#contactus" className={styles.navlink}>
                APPLICANT
              </Nav.Link>
            </Nav>

            <Nav.Link href="#" style={{ marginLeft: "1rem" }}>
              <Stack direction="row" spacing={5}>
                <Avatar {...stringAvatar("Chanuka Devin")} />
              </Stack>
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default AdminNavBar;

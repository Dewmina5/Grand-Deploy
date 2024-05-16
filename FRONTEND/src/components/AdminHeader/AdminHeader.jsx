import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./AdminHeader.module.css";

export default function AdminHeader({ customNavLinks }) {
  const [showMenuIcon, setShowMenuIcon] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowMenuIcon(window.innerWidth < 500);
    };

    // Set initial value on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <center>
        <Navbar data-bs-theme="dark" className={styles.NavBar}>
          <Container>
            {showMenuIcon ? (
              <Nav.Link href="#menu" className={styles.LinkName}>
                {/* Your menu icon, you can use any icon library or custom icon */}
                <i className="bx bx-menu"></i>
              </Nav.Link>
            ) : (
              <Nav className="me-ls">
                {customNavLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <Nav.Link href={link.href} className={styles.LinkName}>
                      {link.label}
                    </Nav.Link>
                    {index < customNavLinks.length - 1 && (
                      <Nav.Link href="#home" className={styles.LinkName}>
                        {" "}
                        &gt;
                      </Nav.Link>
                    )}
                  </React.Fragment>
                ))}
              </Nav>
            )}
          </Container>
        </Navbar>
      </center>
    </div>
  );
}

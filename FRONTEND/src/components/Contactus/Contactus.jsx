import React, { useState } from "react";
import styles from "./Contactus.module.css";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Contactus() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newMessage = {
        FirstName: firstName,
        LasName: lastName,
        Email: email,
        Phone: Phone,
        Message: message,
      };

      const ConstactUsResponce = await axios.post(
        "http://localhost:8000/api/contact/send",
        newMessage
      );
      console.log(ConstactUsResponce);

      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setMessage("");

      toast.success("Successfully Send!", {
        duration: 3000,
        position: "top-right",
      });

      Navigate("/contact-us");
    } catch (err) {
      toast.error("Failed To Register", {
        duration: 3000,
        position: "top-right",
      });
      console.error(err);
    }
  };

  return (
    <div
      className={styles.main}
      style={{
        justifyContent: "center",
        textAlign: "center",
        marginTop: "74px",
      }}
    >
      <div className={styles.container}>
        <Row>
          <Col>
            <div className={styles.map}>
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.786661125461!2d79.86468717365274!3d6.916090918479419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25973beed6fff%3A0x756683a43717dc89!2sNCAS%2C%20National%20Centre%20for%20Advanced%20Studies%20in%20Humanities%20and%20Social%20Sciences!5e0!3m2!1sen!2slk!4v1707213837180!5m2!1sen!2slk"
                width="100%"
                height="650px"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </div>
          </Col>

          <Col className={styles.form}>
            <div className={styles.contactForm}>
              <h1 className={styles.title}>Contact Us</h1>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group controlId="formBasicFirstName" sx={{ mb: 2 }}>
                      <Form.Label className={styles.Label}>
                        First Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First name"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicLastName" sx={{ mb: 2 }}>
                      <Form.Label className={styles.Label}>
                        Last Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last name"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group
                      controlId="formBasicEmail"
                      style={{ marginTop: "1rem" }}
                    >
                      <Form.Label className={styles.Label}>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group
                      controlId="formBasicPhone"
                      style={{ marginTop: "1rem" }}
                    >
                      <Form.Label className={styles.Label}>Phone</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Phone"
                        onChange={(e) => setPhone(e.target.value)}
                        value={Phone}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                  style={{ marginTop: "1rem" }}
                >
                  <Form.Label className={styles.Label}>Message</Form.Label>
                  <Form.Control
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    as="textarea"
                    rows={9}
                    placeholder="Type here..."
                  />
                </Form.Group>

                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<SendIcon />}
                  place
                  style={{ marginTop: "1rem", backgroundColor: "#17376e" }}
                  className={styles.button}
                  onClick=""
                >
                  SEND
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

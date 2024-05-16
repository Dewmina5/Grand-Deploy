import React, { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { Form, Row, Col } from "react-bootstrap";
import styles from "../styles/RegistrationScreen.module.css"; // Import the CSS module
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const universityNames = [
  "University of Colombo",
  "University of Peradeniya",
  "University of Moratuwa",
  "University of Sri Jayewardenepura",
  "University of Kelaniya",
  "University of Jaffna",
  "University of Ruhuna",
  "Eastern University, Sri Lanka",
  "South Eastern University of Sri Lanka",
  "Rajarata University of Sri Lanka",
  "Sabaragamuwa University of Sri Lanka",
  "Wayamba University of Sri Lanka",
  " Uva Wellassa University",
  "University of the Visual & Performing Arts",
  "University of Vauniya, Sri Lanka",

  // Add more university names as needed
];

const positions = [
  "Vice Chancellor",
  "Department Head",
  "Faculty Head",
  "Other",
];
const Adminpositions = ["Interview Panel", "Grant Manager", "Grant Head"];

const RegistrationScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [universityPosition, setUniversityPosition] = useState("");
  const [AdminPosition, setAdminPosition] = useState("");
  const [email, setEmail] = useState("");
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newAdmin = {
        FirstName: firstName,
        LastName: lastName,
        Univercity: universityName,
        UnivercityPosition: universityPosition,
        AdminisrationPosition: AdminPosition,
        Email: email,
        UserName: UserName,
        UserType: "Admin",
        Password: password,
      };

      const AdminRegistrationResponce = await axios.post(
        "http://localhost:8000/api/admin/add",
        newAdmin
      );

      console.log(AdminRegistrationResponce);

      setFirstName("");
      setLastName("");
      setEmail("");
      setUniversityName("");
      setUniversityPosition("");
      setAdminPosition("");
      setUserName("");
      setPassword("");

      toast.success("Successfully Registered!", {
        duration: 3000,
        position: "top-right",
      });

      Navigate("/admin-nav");
    } catch (err) {
      toast.error("Failed To Register", {
        duration: 3000,
        position: "top-right",
      });
      console.error(err);
    }
  };

  const RegisterAdmin = () => {
    console.log(password);

    if (password === Confirmpassword) {
      toast.success("Password matched!", {
        duration: 3000,
        position: "top-right",
      });

      console.log("password match!");
    } else {
      console.log("password Not match");
      toast.error("Password Not Match", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <div className={styles.bodyD}>
      <Container component="main" maxWidth="sm" className={styles.container}>
        <React.Fragment>
          <Typography
            component="h3"
            variant="h5"
            sx={{ mb: 2, fontWeight: 700, fontSize: "1.5rem" }}
            className={styles.header}
          >
            USER REGISTRATION.
          </Typography>

          <Form onSubmit={handleSubmit} className={styles.form}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicFirstName" sx={{ mb: 2 }}>
                  <Form.Label>First Name</Form.Label>
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
                  <Form.Label>Last Name</Form.Label>
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
            <Row style={{ marginTop: "1rem" }}>
              <Col>
                <Form.Group controlId="formBasicFirstName" sx={{ mb: 2 }}>
                  <Form.Label>University Name</Form.Label>
                  <Form.Select
                    onChange={(e) => setUniversityName(e.target.value)}
                    value={universityName}
                    required
                  >
                    <option value="" disabled>
                      Select University
                    </option>
                    {universityNames.map((name, index) => (
                      <option key={index} value={name}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicLastName" sx={{ mb: 2 }}>
                  <Form.Label>University Position</Form.Label>
                  <Form.Select
                    onChange={(e) => setUniversityPosition(e.target.value)}
                    value={universityPosition}
                    required
                  >
                    <option value="" disabled>
                      Select Position
                    </option>
                    {positions.map((position, index) => (
                      <option key={index} value={position}>
                        {position}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {universityPosition === "Other" && (
              <Form.Group
                controlId="formBasicLastName"
                sx={{ mb: 2 }}
                style={{ marginTop: "1rem" }}
              >
                <Form.Label>Administration Position</Form.Label>
                <Form.Select
                  onChange={(e) => setAdminPosition(e.target.value)}
                  value={AdminPosition}
                >
                  <option value="" disabled>
                    Select Position
                  </option>
                  {Adminpositions.map((adminposition, index) => (
                    <option key={index} value={adminposition}>
                      {adminposition}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group
              controlId="formBasicEmail"
              sx={{ mb: 2 }}
              style={{ marginTop: "1rem" }}
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicUserName"
              sx={{ mb: 2 }}
              style={{ marginTop: "1rem" }}
            >
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                value={UserName}
                required
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group
                  controlId="formBasicPassword"
                  sx={{ mb: 2 }}
                  style={{ marginTop: "1rem" }}
                >
                  <Form.Label>Password</Form.Label>
                  <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
                    <Input
                      type={showPassword1 ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword1}
                          >
                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        backgroundColor: "white !important",
                        width: "100%",
                        borderRadius: "0.375rem !important",
                        border: "1px solid #dee2e6 !important",
                        alignItems: "center !important",
                        padding: "2.5px",
                        marginLeft: "-10px",
                        color: "black !important",
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      value={password}
                      required
                    />
                  </FormControl>
                </Form.Group>
              </Col>

              {/* Confirm Password Field */}
              <Col>
                <Form.Group
                  controlId="formConfirmPassword"
                  sx={{ mb: 1 }}
                  style={{ marginTop: "1rem" }}
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        backgroundColor: "white !important",
                        width: "100%",
                        borderRadius: "0.375rem !important",
                        border: "1px solid #dee2e6 !important",
                        alignItems: "center !important",
                        padding: "2.5px",
                        marginLeft: "-10px",
                      }}
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={Confirmpassword}
                      required
                    />
                  </FormControl>
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: "1rem" }}
              className={styles.button}
              onClick={RegisterAdmin}
            >
              Register
            </Button>
          </Form>
        </React.Fragment>
      </Container>
    </div>
  );
};

export default RegistrationScreen;

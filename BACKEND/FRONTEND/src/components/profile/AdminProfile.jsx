import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import Button from "react-bootstrap/Button";
import "./AdminProfile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Form from "react-bootstrap/Form";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Swal from "sweetalert2";


export default function AdminProfile() {
  const [value, setValue] = React.useState("1");
  const [showPasswordCurrent, setShowPasswordCurrent] = React.useState(false);
  const [showPasswordNew, setShowPasswordNew] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const [users, setUsers] = useState("");

  const id = localStorage.getItem("userID");


  const [showChangePasswordForm, setShowChangePasswordForm] =
    React.useState(false);

  const handleClickShowPasswordCurrent = () =>
    setShowPasswordCurrent((show) => !show);
  const handleClickShowPasswordNew = () => setShowPasswordNew((show) => !show);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const popupform = () => setShowChangePasswordForm((show) => !show);

  const [loading, setLoading] = React.useState(false);

  const [Status, setStatus] = useState({});
  const handleChangeState = (e) => {
    const { name, value } = e.target;
    setStatus((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updateState = () => {
    axios
      .put("http://localhost:8000/api/admin/update-status/" + id, Status)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "SuccessFully Updated!",
          showConfirmButton: false,
          timer: 150,
        });
        window.location.reload();
      })
      .catch((err) => {
        alert("Error updating data: " + err.message);
      });
  };

  useEffect(() => {
    function fetchUserDetails() {
      axios
        .get("http://localhost:8000/api/admin/profile/" + id)
        .then((res) => {
          console.log(res.data.AdminAplication);
          setUsers(res.data.AdminAplication);

          toast.success("Data Fetched!", {
            duration: 3000, // 3 seconds
            position: "top-center", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchUserDetails();
  }, [id]);

  const [currentPassword, setCurrentPassword] = useState({});
  const [newPassword, setNewPassword] = useState({});
  const [confirmPassword, setConfirmPassword] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const chagePasswords = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      axios
        .put(
          "http://localhost:8000/api/admin/update-password/" + id,
          chagePasswords
        )
        .then((res) => {
          console.log(res);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "SuccessFully Updated!",
            showConfirmButton: false,
            timer: 150,
          });
          window.location.reload();
        });
    } catch (err) {
      toast.error("Failed To Change", {
        duration: 3000,
        position: "top-right",
      });
      console.error(err);
    }
  };

  // function handleClick() {
  //   setLoading(true);

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }

  return (
    <div id="SupplierProfile" className="body">
      {users && (
        <div className="container">
          <section className="userProfile card">
            <div className="profile">
              <figure>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8fXxe_q94xvOl6YtXkQghvuQHQOJ-hgzbK35eqO27XcFyY9XpDCzw87BowJqTpJXd7Yc&usqp=CAU"
                  alt="profile"
                  width="200px"
                  height="200px"
                />
              </figure>
            </div>
           
          </section>

          <section className="work_skills card">
            <div className="work">
              <h1 className="heading">Security</h1>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: "85%" }} variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                  Username
                </InputLabel>
                <Input
                  value={users.UserName}
                  readOnly
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle style={{ fontSize: "24px" }} />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <br />

              <FormControl sx={{ m: 1, width: "85%" }} variant="standard">
                <h3>Password</h3>
                <Input
                  id="standard-adornment-password"
                  type="password"
                  value={users.Password}
                  readOnly
                  endAdornment={
                    <InputAdornment position="end"></InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <br />
            <br />
            <div>
              <Button style={{ margin: "10px" }} onClick={popupform}>
                Change Password
              </Button>
            </div>

            <br />
            <br />

            {showChangePasswordForm && (
              <div className="changePasswordform">
                <Form
                 
                  style={{
                    border: "2px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                >
                  <FormControl sx={{ m: 2, width: "85%" }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">
                      Current Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPasswordCurrent ? "text" : "password"}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordCurrent}
                          >
                            {showPasswordCurrent ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <FormControl sx={{ m: 2, width: "85%" }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password2">
                      New Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-password2"
                      type={showPasswordNew ? "text" : "password"}
                      onChange={(e) => setNewPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordNew}
                          >
                            {showPasswordNew ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <FormControl sx={{ m: 2, width: "85%" }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password3">
                      Confirm Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-password3"
                      type={showPasswordConfirm ? "text" : "password"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordConfirm}
                          >
                            {showPasswordConfirm ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <div style={{ margin: "20px" }}>
                    <LoadingButton
                      size="small"
                      onClick={handleClick}
                      loading={loading}
                      loadingPosition="center"
                      variant="contained"
                      color="success"
                    >
                      <span>Submit</span>
                    </LoadingButton>
                  </div>
                </Form>
              </div>
            )}
          </section>

          <section className="userDetails card">
            <div className="userName">
              <Row>
                <Col>
                  <h1 className="name">
                    {users.FirstName} {users.LastName}
                  </h1>
                </Col>
                <Col>
                  <div className="map">
                    <i className="bx bx-location-plus bx-md"></i>
                    <span style={{ padding: "10px" }}>Galle</span>
                  </div>
                </Col>
              </Row>
              <p>
                <span style={{ fontWeight: "600", color: "GrayText" }}>
                  {users.UnivercityPosition === "other"
                    ? "Administration Position"
                    : users.AdminisrationPosition}{" "}
                </span>{" "}
              </p>

              <br />

              <p>
                Work's At{" "}
                <span
                  style={{ color: "red", fontSize: "19px", fontWeight: "600" }}
                >
                  {users.Univercity}
                </span>
              </p>

              <p style={{ fontSize: "12px", color: "GrayText" }}>
                The NCAS is glad to profile those who have completed their PhDs
                and MPhils under its grants scheme as a token of appreciation
                for them and an encouragement for those who are on line to
                complete their ongoing studies. Four Hundred ninety four (494)
                grantees have completed their postgraduate degrees at the end of
                the year 2018.They come from the fields of Psychology,
                Anthropology/Paleobiology, Indigenous Medicine, Library Science,
                Management, Sociology, Comparative Religion, Mass Communication,
                Economics, Geography, Education, History and Archeology,
                Political Science, International Relations, Linguistics,
                Philosophy, Buddihist Studies, Arabic Language Studies, Sinhala,
                English, Fine Arts
              </p>
            </div>
          </section>

          <section className="timeline_about card">
            <div className="tabs">
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Self Status" value="1" />
                      <Tab label="Change Status" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">{users.Status}</TabPanel>
                  <TabPanel value="2">
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Change Status</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="Status"
                          onChange={handleChangeState}
                        />
                      </Form.Group>
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        style={{ backdropFilter: "black" }}
                        onClick={updateState}
                        name="status"
                      >
                        Update
                      </button>
                    </Form>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
            <br />
            <br />
            <div className="contact_Info">
              <h1 className="heading" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                Contact Information
              </h1>
              <ul>
                <li className="phone" style={{ margin: "10px" }}>
                  <h1 className="label">
                    Phone: {""} {""}{" "}
                    <span
                      className="info"
                      style={{ color: "#0099cc", letterSpacing: "0.07em" }}
                    >
                      +94 011 2680849
                    </span>
                  </h1>
                </li>

                <li className="address" style={{ margin: "10px" }}>
                  <h1 className="label">Address:</h1>
                  <span className="info" style={{ color: "#0099cc" }}>
                    National Centre for Advanced Studies in Humanities & Social
                    Sciences,
                    <br />
                    6A, Sukhastan Gardens, Ward Place ,
                    <p>
                      {" "}
                      Colombo – 07. <br />
                      Sri Lanka.
                    </p>
                  </span>
                </li>

                <li className="email" style={{ margin: "10px" }}>
                  <h1 className="label">
                    E-mail:{" "}
                    <span className="info" style={{ color: "#0099cc" }}>
                      {users.Email}
                    </span>
                  </h1>
                </li>
              </ul>
            </div>

            <div className="basic_info">
              <h1 className="heading">Basic Information</h1>
              <ul>
                <li className="join">
                  <h1 className="label">Join Date :</h1>
                  <span className="info"> {users.createdAt.split("T")[0]}</span>
                </li>

                <li className="sex">
                  <h1 className="label">Last update : </h1>
                  <span className="info"> {users.updatedAt.split("T")[0]}</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

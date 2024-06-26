import React, { useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import KeyIcon from "@mui/icons-material/Key";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "../styles/LoginScreen.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


const LoginScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await axios.post(
          "api/admin/signin",
          {
            UserName: formData.username,
            Password: formData.password,
          }
        );

        console.log("Login successful");
        console.log(response.data); // Assuming your server sends some data on successful login
        const userData = JSON.stringify(response.data);

        localStorage.setItem("UserInfo", userData);

        if (
          response.data.UserType === "Admin" &&
          response.data.UnivercityPosition === "Other" &&
          response.data.Adminpositions != "Interview Panel"
        ) {
          Navigate("/admin-nav");
          localStorage.setItem("userID", response.data._id);
        } else if (
          response.data.UserType === "Admin" &&
          (response.data.UnivercityPosition === "Department Head" ||
            response.data.UnivercityPosition === "Vice Chancellor" ||
            response.data.UnivercityPosition === "Faculty Head")
        ) {
          Navigate("/aprove-home");
          localStorage.setItem("userID", response.data._id);
        } else if (response.data.UserType === "User") {
          Navigate("/viewForm");
        }

        toast.success("Successfully Login!", {
          duration: 3000, // 3 seconds
          position: "top-right", // You can change the position if needed
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Login failed", error);
        toast.error("Login Failed!");
        setIsLoading(false);
      }
    } else {
      console.log("Login failed");
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rememberMe" ? checked : value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.bodyD}>
      <Container component="main" maxWidth="sm" className={styles.container}>
        <Typography
          component="h3"
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 700,
            fontSize: "1.5rem",
            textAlign: "center",
          }}
          className={styles.header}
        >
          LOGIN
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl
            fullWidth
            variant="standard"
            className={styles.usernameInput}
          >
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={Boolean(errors.username)}
            />
            {errors.username && (
              <Typography
                variant="body2"
                color="error"
                className={styles.errorMessage}
              >
                {errors.username}
              </Typography>
            )}
          </FormControl>

          <FormControl
            fullWidth
            variant="standard"
            className={styles.passwordInput}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <Input
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              startAdornment={
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  {formData.password && (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )}
                </InputAdornment>
              }
              label="Password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
            />
            {errors.password && (
              <Typography
                variant="body2"
                color="error"
                className={styles.errorMessage}
              >
                {errors.password}
              </Typography>
            )}
          </FormControl>
          {isLoading ? (<>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </>) : (<><Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.loginButton}
          >
            Login
          </Button></>)}

        </form>

        <Box className={styles.forgotPassword}>
          <Link href="#" variant="body2">
            Forgot Password?
          </Link>
        </Box>

        <Box className={styles.signUpLink}>
          <Link href="#" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Container>
    </div>
  );
};

export default LoginScreen;

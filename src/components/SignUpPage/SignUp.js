import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loader from "../Pages/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusMessageType, setStatusMessageType] = useState(""); // success or error
  const navigate = useNavigate();
  const appBackendUrl = process.env.REACT_APP_API_BASE_URL;

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setStatusMessage(""); // Clear previous messages
    setStatusMessageType(""); // Clear message type (success/error)

    const data = new FormData(event.currentTarget);
    const userDetails = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    console.log("Signup Data:", userDetails);
    const apiUrl = `${appBackendUrl}/signup`;
    console.log("API URL:", apiUrl); // Check if the URL is correct

    // Make an API request to the backend for signup
    axios
      .post(apiUrl, userDetails)
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setStatusMessageType("success");
          setStatusMessage("Signup successful! Redirecting to login...");
         
        } else {
          setStatusMessageType("error");
          setStatusMessage(response.data.message || "Signup failed. Please try again.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setStatusMessageType("error");
        setStatusMessage("An error occurred. Please try again later.");
        console.error("Signup error:", error);
      });
  };

  return (
    <>
      {loading && <Loader />} {/* Show loader conditionally */}
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            boxShadow: 3,
            padding: 4,
            borderRadius: 2,
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{borderRadius:"var(--primary-border-radius)"}}
            >
              Sign Up
            </Button>
          </form>

          {/* Display the status message */}
          {statusMessage && (
            <Typography
              variant="body2"
              textAlign="center"
              mt={2}
              color={statusMessageType === "success" ? "green" : "red"} // Color based on success or error
            >
              {statusMessage}
            </Typography>
          )}

          <Typography
            variant="body2"
            textAlign="center"
            mt={2}
            color="text.secondary"
          >
            Already have an account? <a href="/upload-documents/login">Log in</a>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;

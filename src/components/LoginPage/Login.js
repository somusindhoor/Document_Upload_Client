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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();
  const appBackendUrl = process.env.REACT_APP_API_BASE_URL;

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setStatusMessage(""); // Clear previous messages

    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get("email"),
      password: data.get("password"),
    };

    console.log("Sign In Data:", credentials);

    // Make an API request to the backend for login
    axios
    .post(`${appBackendUrl}/login`, credentials)
    .then((response) => {
      setLoading(false);
      if (response.data.message === "Login successful") {
        setStatusMessage("Sign In successful!");
        navigate("/home"); // Redirect to dashboard after login
      } else {
        setStatusMessage("Invalid email or password. Please try again.");
      }
    })
    .catch((error) => {
      setLoading(false);
      setStatusMessage("An error occurred. Please try again later.");
      console.error("Login error:", error);
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
          justifyContent: "center",
          alignItems: "center",
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
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
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
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
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
              Sign In
            </Button>
          </form>
          {statusMessage && (
            <Typography
              variant="body2"
              textAlign="center"
              mt={2}
              color={statusMessage.includes("successful") ? "green" : "red"}
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
            Don’t have an account? <a href="/upload-documents/signup">Sign Up</a>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Login;

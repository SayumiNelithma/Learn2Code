import { useState } from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "../api/axiosConfig";
import { useAuth } from "../auth/AuthContext";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async () => {
      if (!email || !password) {
        toast.error("Please fill in both email and password");
        return;
      }
  
      try {
        const res = await axios.post("/auth/signin", { email, password });
        login(res.data.token);
        toast.success("Login successful!");
        navigate("/");
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    };

    return (
        <Grid container sx={{ minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
          {/* LEFT PANEL */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: "linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: { xs: 4, md: 12 },
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative elements */}
            <Box
              sx={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                top: "-50px",
                left: "-50px",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                bottom: "10%",
                right: "5%",
              }}
            />
    
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ maxWidth: "420px", width: "100%", position: "relative", zIndex: 2 }}>
                <Typography variant="h3" fontWeight="bold" mb={3}>
                  Welcome Learn2Code! 👋
                </Typography>
                <Typography variant="body1" mb={5} sx={{ opacity: 0.9, fontSize: "1.1rem" }}>
                  We're excited to see you again. Access your account and continue your journey with us.
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    borderWidth: "2px",
                    px: 4,
                    py: 1,
                    borderRadius: 8,
                    fontWeight: "600",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderColor: "white",
                      borderWidth: "2px",
                    },
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Create Account
                </Button>
              </Box>
            </motion.div>
          </Grid>
    
          {/* RIGHT PANEL */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: "#f5f9fc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: { xs: 4, md: 8 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ width: "100%", maxWidth: "450px" }}
            >
              <Box sx={{ textAlign: "center", mb: 5 }}>
                <Typography 
                  variant="h4" 
                  fontWeight="bold" 
                  sx={{ 
                    color: "#2196f3",
                    position: "relative",
                    display: "inline-block",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      width: "60%",
                      height: "4px",
                      borderRadius: "2px",
                      backgroundColor: "#2196f3",
                      bottom: "-10px",
                      left: "20%"
                    }
                  }}
                >
                  Sign In
                </Typography>
              </Box>
    
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: 4,
                  boxShadow: "0 8px 30px rgba(33, 150, 243, 0.12)",
                  p: { xs: 3, md: 5 },
                }}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#2196f3",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#2196f3",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#2196f3",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#2196f3",
                    },
                  }}
                />
    
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 4,
                    py: 1.5,
                    background: "#2196f3",
                    fontWeight: "600",
                    borderRadius: 8,
                    textTransform: "none",
                    fontSize: "1rem",
                    letterSpacing: 0.5,
                    boxShadow: "0 4px 15px rgba(33, 150, 243, 0.35)",
                    "&:hover": {
                      background: "#1976d2",
                      boxShadow: "0 6px 20px rgba(33, 150, 243, 0.45)",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
    
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 2,
                    borderColor: "#2196f3",
                    color: "#2196f3",
                    fontWeight: 600,
                    borderRadius: 8,
                    textTransform: "none",
                    fontSize: "0.95rem",
                    py: 1.2,
                    "&:hover": {
                      borderColor: "#1976d2",
                      backgroundColor: "rgba(33, 150, 243, 0.05)",
                    },
                  }}
                  onClick={() =>
                    window.location.href =
                      "http://localhost:9090/oauth2/authorization/google"
                  }
                >
                  Sign in with Google
                </Button>
    
                <Typography
                  variant="body2"
                  align="center"
                  mt={4}
                  sx={{ color: "#757575", cursor: "pointer" }}
                  onClick={() => navigate("/signup")}
                >
                  Don't have an account? <span style={{ color: "#2196f3", fontWeight: 600 }}>Sign up</span>
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      );
    }
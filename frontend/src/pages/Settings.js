import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Avatar,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import axios from "../api/axiosConfig";
import { toast } from "react-toastify";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SaveIcon from "@mui/icons-material/Save";

export default function Settings() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "", // 👈 add this
    profileImage: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
        type: user.type || "",
      }));
    }
  }, [user]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, #1e2a3a 0%, #0d1821 100%)",
          color: "#fff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <PersonIcon sx={{ fontSize: 32, mr: 2, color: "#2196f3" }} />
          <Typography variant="h4" fontWeight="600">
            Account Settings
          </Typography>
        </Box>

        <Divider sx={{ mb: 4, backgroundColor: "rgba(255,255,255,0.1)" }} />

        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={
                previewImage
                  ? previewImage
                  : user?.profileImage
                  ? `http://localhost:9090${user.profileImage}`
                  : undefined
              }
              alt={user?.username}
              sx={{
                width: 150,
                height: 150,
                mb: 2,
                border: "4px solid #2196f3",
                fontSize: 48,
                bgcolor: "#2196f3",
              }}
            >
              {!previewImage &&
                !user?.profileImage &&
                user?.username?.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ position: "relative", width: "100%" }}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<PhotoCamera />}
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.3)",
                  "&:hover": {
                    borderColor: "#2196f3",
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                  },
                }}
              >
                Change Profile Photo
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PersonIcon sx={{ color: "#2196f3", mr: 1 }} />
                  <Typography variant="subtitle1">Username</Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": { borderColor: "#2196f3" },
                      "&.Mui-focused fieldset": { borderColor: "#2196f3" },
                    },
                    input: { color: "#fff" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <EmailIcon sx={{ color: "#2196f3", mr: 1 }} />
                  <Typography variant="subtitle1">Email Address</Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": { borderColor: "#2196f3" },
                      "&.Mui-focused fieldset": { borderColor: "#2196f3" },
                    },
                    input: { color: "#fff" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PersonIcon sx={{ color: "#2196f3", mr: 1 }} />
                  <Typography variant="subtitle1">Account Type</Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={
                    form.type
                      ? form.type.charAt(0) + form.type.slice(1).toLowerCase()
                      : ""
                  }
                  readonly
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": { borderColor: "#2196f3" },
                      "&.Mui-disabled fieldset": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&.Mui-disabled input": { color: "#fff" }, // 👈 fix text color
                    },
                    input: { color: "#fff" }, // fallback
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LockIcon sx={{ color: "#2196f3", mr: 1 }} />
                  <Typography variant="subtitle1">New Password</Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  placeholder="Leave blank to keep current password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": { borderColor: "#2196f3" },
                      "&.Mui-focused fieldset": { borderColor: "#2196f3" },
                    },
                    input: { color: "#fff" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LockIcon sx={{ color: "#2196f3", mr: 1 }} />
                  <Typography variant="subtitle1">
                    Confirm New Password
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          sx={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": { borderColor: "#2196f3" },
                      "&.Mui-focused fieldset": { borderColor: "#2196f3" },
                    },
                    input: { color: "#fff" },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleUpdate}
            sx={{
              flex: 1,
              bgcolor: "#2196f3",
              "&:hover": {
                bgcolor: "#1976d2",
              },
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Save Changes
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={async () => {
              if (
                !window.confirm(
                  "Are you sure you want to delete your account? This action cannot be undone."
                )
              )
                return;

              try {
                await axios.delete("/auth/delete-account");
                toast.success("Account deleted. Goodbye!");
                localStorage.removeItem("token");
                window.location.href = "/signin";
              } catch (err) {
                toast.error(
                  err.response?.data?.message || "Account deletion failed"
                );
              }
            }}
            sx={{
              flex: 1,
              borderColor: "#f44336",
              color: "#f44336",
              fontWeight: "bold",
              "&:hover": {
                borderColor: "#d32f2f",
                backgroundColor: "rgba(244, 67, 54, 0.1)",
              },
            }}
          >
            Delete Account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

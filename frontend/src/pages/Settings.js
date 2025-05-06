import { Paper, TextField } from "@mui/material";
import React from "react";

export default function Settings() {
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
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

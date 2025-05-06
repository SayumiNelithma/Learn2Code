import { Paper } from "@mui/material";
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
            
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

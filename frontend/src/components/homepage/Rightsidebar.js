
import { Box, Avatar, Typography, Button } from "@mui/material";

export default function Rightsidebar({ user, allUsers, followStatus, handleFollowRequest, handleUnfollow }) {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: 300 },
        p: { xs: 1, md: 2 },
        display: "flex",
        flexDirection: "column",
        position: { md: "sticky" },
        top: 0,
        height: { md: "100vh" },
        overflow: { md: "auto" },
        bgcolor: { xs: "#fafafa", md: "transparent" },
        borderRadius: { xs: 2, md: 0 },
      }}
    >
      {/* User Profile */}
      {user && (
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            mb: 4,
            px: { xs: 2, md: 0 }
          }}
        >
          <Avatar
            sx={{ 
              width: { xs: 48, md: 56 }, 
              height: { xs: 48, md: 56 }, 
              mr: 2 
            }}
            src={
              user.profileImage
                ? `http://localhost:9090${user.profileImage}`
                : undefined
            }
            alt={user.username}
          >
            {!user.profileImage && user.username?.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              {user.username || "User"}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {user.email}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Suggested Users */}
      <Box 
        sx={{ 
          p: { xs: 1.5, md: 2 }, 
          borderRadius: 3,
          boxShadow: { xs: '0 1px 3px rgba(0,0,0,0.08)', md: 'none' },
          bgcolor: { xs: 'white', md: 'transparent' },
          mx: { xs: 1, md: 0 }
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontWeight: 500,
            fontSize: { xs: '1rem', md: '1.25rem' },
            pl: { xs: 1, md: 0 }
          }}
        >
          Suggested for you
        </Typography>
        
        <Box sx={{ maxHeight: { xs: '100%', md: 'calc(100vh - 200px)' }, overflow: 'auto' }}>
          {allUsers
            .filter((u) => u.email !== user?.email)
            .map((u) => (
              <Box
                key={u.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                p={1}
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.02)'
                  }
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar 
                    sx={{ width: { xs: 36, md: 40 }, height: { xs: 36, md: 40 } }}
                  >
                    {u.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                    {u.username}
                  </Typography>
                </Box>
                {followStatus[u.id] === "ACCEPTED" ? (
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleUnfollow(u.id)}
                    sx={{
                      minWidth: { xs: '70px', md: '80px' },
                      fontSize: { xs: '0.7rem', md: '0.8rem' }
                    }}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant={
                      followStatus[u.id] === "PENDING"
                        ? "outlined"
                        : "contained"
                    }
                    disabled={followStatus[u.id] !== "NONE"}
                    onClick={() => handleFollowRequest(u.id)}
                    sx={{
                      minWidth: { xs: '70px', md: '80px' },
                      fontSize: { xs: '0.7rem', md: '0.8rem' }
                    }}
                  >
                    {followStatus[u.id] === "PENDING" ? "Requested" : "Follow"}
                  </Button>
                )}
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}
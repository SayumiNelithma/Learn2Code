
import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import {
    Container,
    Typography,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    Card,
    CardContent,
    Box,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Paper,
    Divider,
    Chip,
  } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import EditIcon from "@mui/icons-material/Edit";  //Updating profile details
import DeleteIcon from "@mui/icons-material/Delete";  //delete user profile 
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { toast } from "react-toastify";
import Leftsidebar from "../components/homepage/Leftsidebar";
import StatusUpload from "../components/StatusUpload";

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [followRequests, setFollowRequests] = useState([]);
    const navigate = useNavigate();
    const BASE_URL = "http://localhost:9090";
    const [statuses, setStatuses] = useState([]);
    const [followCounts, setFollowCounts] = useState({
      followers: 0,
      following: 0,
    });

  const fetchFollowCounts = () => {
    axios.get("/follow/counts").then((res) => setFollowCounts(res.data));
  };

  const fetchPosts = () => {
    axios.get("/posts/my").then((res) => setPosts(res.data));
  };

  const fetchFollowRequests = () => {
    axios.get("/follow/requests").then((res) => setFollowRequests(res.data));
  };

  useEffect(() => {
    fetchPosts();
    fetchFollowRequests();
    fetchFollowCounts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);
      toast.success("Post deleted");
      fetchPosts();
    } catch (err) {
      toast.error("Failed to delete post");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleAcceptFollow = (followId) => {
    axios.post(`/follow/accept/${followId}`).then(() => {
      toast.success("Follow request accepted");
      setFollowRequests((prev) => prev.filter((req) => req.id !== followId));
    });
  };

  useEffect(() => {
    loadStatuses();
  }, []);

  const loadStatuses = () => {
    axios.get("/status").then((res) => setStatuses(res.data));
  };

  const handleDeleteStatus = (id) => {
    axios.delete(`/status/${id}`).then(() => loadStatuses());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Leftsidebar />
      <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3, 
            backgroundColor: "white",
            border: "1px solid #f0f0f0"
          }}
        >
          <StatusUpload onUpload={loadStatuses} />

          <Box display="flex" flexDirection="column" alignItems="center" mb={3} mt={3}>
            <Box 
              display="flex" 
              gap={4} 
              sx={{ 
                p: 2, 
                backgroundColor: "#f8f9fe", 
                borderRadius: 2,
                width: "fit-content",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.05)"
              }}
            >
              <Box 
                textAlign="center" 
                sx={{ 
                  borderRight: "1px solid #e0e0e0", 
                  pr: 4 
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {followCounts.followers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Followers
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {followCounts.following}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Following
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {followRequests.length > 0 && (
          <Paper 
            elevation={0}
            sx={{ 
              mb: 4, 
              p: 3, 
              borderRadius: 3, 
              backgroundColor: "white",
              border: "1px solid #f0f0f0"
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <PersonAddIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="500">
                Follow Requests
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              {followRequests.map((req) => (
                <ListItem
                  key={req.id}
                  sx={{ 
                    mb: 1, 
                    backgroundColor: "#f8f9fe", 
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#f0f4ff" }
                  }}
                  secondaryAction={
                    <Button
                      onClick={() => handleAcceptFollow(req.id)}
                      variant="contained"
                      size="small"
                      sx={{ 
                        borderRadius: 6,
                        textTransform: "none",
                        px: 2,
                        backgroundColor: "#4d7cfe",
                        "&:hover": { backgroundColor: "#3a6bec" }
                      }}
                    >
                      Accept
                    </Button>
                  }
                >
                  <Avatar sx={{ mr: 2, bgcolor: "#4d7cfe" }}>
                    {req.follower.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Typography fontWeight="500">
                        {req.follower.username}
                      </Typography>
                    }
                    secondary={req.follower.email}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="600" color="#333">
            My Posts
          </Typography>
          <Box display="flex" gap={2}>
            <Button 
              variant="contained" 
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate("/add-post")}
              sx={{
                borderRadius: 6,
                textTransform: "none",
                px: 3,
                py: 1,
                backgroundColor: "#2196F3",
                "&:hover": { backgroundColor: "#2196F3" }
              }}
            >
              Add Post
            </Button>
            <Button
              variant="outlined"
              startIcon={<BookmarkIcon />}
              onClick={() => navigate("/my-learning-plans")}
              sx={{
                borderRadius: 6,
                textTransform: "none",
                px: 3,
                py: 1,
                borderColor: "#4d7cfe",
                color: "#4d7cfe",
                "&:hover": {
                  borderColor: "#3a6bec",
                  backgroundColor: "rgba(77, 124, 254, 0.04)"
                }
              }}
            >
              My Learning
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={post.id}>
              <Card 
                sx={{ 
                  bgcolor: "white", 
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 8px 16px rgba(0,0,0,0.08)"
                  }
                }}
              >
                {post.mediaPaths?.length > 0 && (
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1",
                      maxHeight: 200,
                      overflow: "hidden",
                    }}
                  >
                    <Swiper 
                      slidesPerView={1}
                      style={{ borderRadius: "0" }}
                    >
                      {post.mediaPaths.map((path, idx) => (
                        <SwiperSlide key={idx}>
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              overflow: "hidden",
                              maxHeight: 500,
                              maxWidth: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#f0f0f0",
                            }}
                          >
                            {/* <img
                              src={`${BASE_URL}${path}`}
                              alt={`media-${idx}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            /> */}
                             {path.toLowerCase().endsWith(".mp4") ? (
          <video
            src={`${BASE_URL}${path}`}
            controls
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundColor: "#000",
            }}
          />
        ) : (
          <img
            src={`${BASE_URL}${path}`}
            alt={`media-${idx}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
                          </Box>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        display: "flex",
                        gap: 1,
                        zIndex: 10,
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{ 
                          bgcolor: "rgba(255,255,255,0.9)",
                          "&:hover": { bgcolor: "rgba(255,255,255,1)" }
                        }}
                        onClick={() => navigate(`/edit-post/${post.id}`)}
                      >
                        <EditIcon fontSize="small" sx={{ color: "#4d7cfe" }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ 
                          bgcolor: "rgba(255,255,255,0.9)",
                          "&:hover": { bgcolor: "rgba(255,255,255,1)" }
                        }}
                        onClick={() => setConfirmDeleteId(post.id)}
                      >
                        <DeleteIcon fontSize="small" sx={{ color: "#ff5252" }} />
                      </IconButton>
                    </Box>
                  </Box>
                )}
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: "#4d7cfe" }}>
                      {post.user?.username?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                    <Typography variant="subtitle2" color="text.secondary">
                      {post.user?.username || "You"}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="600" mb={1}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {post.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={!!confirmDeleteId}
          onClose={() => setConfirmDeleteId(null)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 1
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 500 }}>
            Are you sure you want to delete this post?
          </DialogTitle>
          <DialogActions>
            <Button 
              onClick={() => setConfirmDeleteId(null)}
              sx={{ 
                borderRadius: 6,
                textTransform: "none"
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => handleDelete(confirmDeleteId)} 
              color="error"
              variant="contained"
              sx={{ 
                borderRadius: 6,
                textTransform: "none",
                bgcolor: "#ff5252",
                "&:hover": { bgcolor: "#e03c3c" }
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
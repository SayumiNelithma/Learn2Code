import React from "react";
import Leftsidebar from "../components/homepage/Leftsidebar";
import RightSidebar from "../components/homepage/Rightsidebar";

const Home = () => {
  return (
    <Box>
      <Leftsidebar />

      {/* Main Content */}
      <Box
        sx={{ flex: 1, maxWidth: 950, mx: "auto", my: 2, p: 2, width: "100%" }}
      >
        {/* Feed Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #dbdbdb",
            mb: 3,
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          {["following", "all", "my"].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              sx={{
                textTransform: "none",
                color: activeTab === tab ? "black" : "#8e8e8e",
                borderBottom: activeTab === tab ? "1px solid black" : "none",
                borderRadius: 0,
                paddingBottom: 1,
              }}
            >
              {tab === "following"
                ? "Following"
                : tab === "all"
                ? "All Posts"
                : "My Posts"}
            </Button>
          ))}
        </Box>

        <RenderStatusBar
          statuses={statuses}
          user={user}
          handleOpenStatus={setOpenStatus}
          handleDeleteStatus={handleDeleteStatus}
          handleEditStatus={setEditingStatus}
        />

        {/* Posts Feed */}
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{
                mb: 4,
                boxShadow: "none",
                border: "1px solid #dbdbdb",
                borderRadius: 2,
              }}
            >
              {/* Post Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderBottom: "1px solid #efefef",
                }}
              >
                {/* <Avatar sx={{ mr: 1 }}>
                  {post.user.username?.charAt(0).toUpperCase()}
                </Avatar> */}
                <Avatar
                  sx={{ mr: 1 }}
                  src={
                    post.user.profileImage
                      ? `http://localhost:9090${post.user.profileImage}`
                      : undefined
                  }
                  alt={post.user.username}
                >
                  {!post.user.profileImage &&
                    post.user.username?.charAt(0).toUpperCase()}
                </Avatar>

                <Typography variant="subtitle2" fontWeight="bold">
                  {post.user.username}
                </Typography>
              </Box>

              {/* Media */}
              {post.mediaPaths?.length > 0 && (
                <Swiper spaceBetween={0} slidesPerView={1}>
                  {post.mediaPaths.map((path, index) => (
                    <SwiperSlide key={index}>
                      {/* <img
                        src={`${BASE_URL}${path}`}
                        alt={`media-${index}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: 600,
                          objectFit: "cover",
                        }}
                      /> */}
                      {path.toLowerCase().endsWith(".mp4") ? (
                        <video
                          src={`${BASE_URL}${path}`}
                          controls
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: 600,
                            objectFit: "cover",
                            backgroundColor: "#000",
                          }}
                        />
                      ) : (
                        <img
                          src={`${BASE_URL}${path}`}
                          alt={`media-${index}`}
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: 600,
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* Action Buttons */}
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton onClick={() => toggleLike(post.id)} sx={{ p: 0 }}>
                    {likeStatus[post.id]?.liked ? (
                      <Favorite sx={{ color: "#ed4956" }} />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </Box>

                {/* Like Count */}
                <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                  {likeStatus[post.id]?.likeCount || 0}{" "}
                  {likeStatus[post.id]?.likeCount === 1 ? "like" : "likes"}
                </Typography>

                {/* Caption */}
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" component="span">
                    <Typography
                      variant="body2"
                      component="span"
                      fontWeight="bold"
                      sx={{ mr: 1 }}
                    >
                      {post.user.username}
                    </Typography>
                    {post.description}
                  </Typography>
                </Box>

                {/* View all comments link if more than 2 */}
                {comments[post.id]?.length > 2 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, cursor: "pointer" }}
                  >
                    View all {comments[post.id]?.length} comments
                  </Typography>
                )}

                {/* Comments */}
                <List disablePadding sx={{ mt: 1 }}>
                  {(comments[post.id] || []).slice(0, 2).map((comment) => (
                    <ListItem
                      key={comment.id}
                      disablePadding
                      disableGutters
                      sx={{ mb: 0.5 }}
                    >
                      {editCommentId === comment.id ? (
                        <TextField
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          onBlur={() => handleSaveEdit(comment.id, post.id)}
                          fullWidth
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            width: "100%",
                          }}
                        >
                          <Typography variant="body2" component="span">
                            <Typography
                              variant="body2"
                              component="span"
                              fontWeight="bold"
                              sx={{ mr: 1 }}
                            >
                              {comment.user.username}
                            </Typography>
                            {comment.content}
                          </Typography>

                          {(comment.user.email === user?.email ||
                            post.user.email === user?.email) && (
                            <Box ml={1} display="flex">
                              {comment.user.email === user?.email && (
                                <IconButton
                                  size="small"
                                  onClick={() => handleEdit(comment)}
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                              )}
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleDelete(comment.id, post.id)
                                }
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          )}
                        </Box>
                      )}
                    </ListItem>
                  ))}
                </List>

                {/* Post Time */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>

                {/* Add Comment Input */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    pt: 2,
                    borderTop: "1px solid #efefef",
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Add a comment..."
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    value={newCommentText[post.id] || ""}
                    onChange={(e) =>
                      setNewCommentText((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCommentSubmit(post.id);
                      }
                    }}
                  />
                  <Button
                    onClick={() => handleCommentSubmit(post.id)}
                    disabled={!newCommentText[post.id]}
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      color: !newCommentText[post.id] ? "#b3dffc" : "#0095f6",
                    }}
                  >
                    Post
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>

      <RightSidebar
        user={user}
        allUsers={allUsers}
        followStatus={followStatus}
        handleFollowRequest={handleFollowRequest}
        handleUnfollow={handleUnfollow}
      />
    </Box>
  );
};

export default Home;

import React from "react";
import Leftsidebar from "../components/homepage/Leftsidebar";
import RightSidebar from "../components/homepage/Rightsidebar";

const Home = () => {
  return (
    <Box>
      <Leftsidebar />

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

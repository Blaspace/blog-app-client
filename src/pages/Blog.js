import React, { useEffect } from "react";
import Newblog from "../component/Newblog";
import verify from "../hooks/verify";
import AllBlog from "../component/AllBlog";
import LeftSideBar from "../component/LeftSideBar";
import RightSidebar from "../component/RightSidebar";

function Profile() {
  const handleVerify = verify();
  useEffect(() => {
    handleVerify();
  }, [handleVerify]);

  return (
    <div className="blog">
      <div className="left-side">
        <br />
        <br />
        <LeftSideBar />
      </div>
      <main className="main">
        <AllBlog />
        <Newblog />
        <br />
        <br />
        <br />
      </main>
      <div className="right-side">
        <br />
        <br />
        <RightSidebar />
      </div>
    </div>
  );
}

export default Profile;

import React, { useContext, useEffect } from "react";
import Newblog from "../component/Newblog";
import verify from "../hooks/verify";
import AllBlog from "../component/AllBlog";
import LeftSideBar from "../component/LeftSideBar";
import RightSidebar from "../component/RightSidebar";
import AllContext from "../contexts/AllContext";
import Loading from "../component/Loading";

function Profile() {
  const handleVerify = verify();
  const { loading } = useContext(AllContext);
  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <>
      {!loading ? (
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
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Profile;

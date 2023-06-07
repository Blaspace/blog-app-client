import ProfileUI from "../component/ProfileUl";
import React from "react";
import Newblog from "../component/Newblog";
import AllBlog from "../component/AllBlog";
import LeftSingleUser from "../component/LeftSingleUser";
import SingleUserHeading from "../component/SingleUserHeading";

function Home() {
  return (
    <>
      <div className="profile">
        <SingleUserHeading />
        <ProfileUI />
        <section className="profile-body">
          <div className="left-profile-con">
            <LeftSingleUser />
          </div>

          {/*main area*/}

          <div className="profile-main">
            <Newblog />
            <AllBlog />
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;

import ProfileUI from "./ProfileUl";
import React, { useContext, useEffect } from "react";
import Newblog from "../blog/Newblog";
import AllBlog from "../blog/AllBlog";
import LeftSingleUser from "./LeftSingleUser";
import SingleUserHeading from "./SingleUserHeading";
import AllContext from "../../contexts/AllContext";
import BlogContext from "../../contexts/BlogContext";

function Home() {
  const { refresh, uri } = useContext(AllContext);
  const { setUsers, users } = useContext(BlogContext);
  useEffect(() => {
    if (!users?.length) {
      fetch(`${uri}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 403) {
            return refresh();
          }
        })
        .then((data) => setUsers(data));
    }
  }, []);
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

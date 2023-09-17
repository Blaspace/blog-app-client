import React, { useContext, useEffect } from "react";
import Newblog from "./Newblog";
import AllBlog from "./AllBlog";
import LeftSideBar from "./LeftSideBar";
import RightSidebar from "./RightSidebar";
import BlogContext from "../../contexts/BlogContext";
import AllContext from "../../contexts/AllContext";

function Profile() {
  const { users, setUsers } = useContext(BlogContext);
  const { uri } = useContext(AllContext);

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
            throw "error";
          }
        })
        .then((data) => {
          setUsers(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <div className="blog">
        <div className="left-side">
          <br />
          <br />
          <LeftSideBar />
        </div>
        <main className="main">
          <br />
          <br />
          <br />
          <Newblog />
          <AllBlog />
        </main>
        <div className="right-side">
          <br />
          <br />
          <RightSidebar />
        </div>
      </div>
    </>
  );
}

export default Profile;

import React, { useContext, useState, useEffect } from "react";
import Newblog from "../component/Newblog";
import AllBlog from "../component/AllBlog";
import LeftSideBar from "../component/LeftSideBar";
import RightSidebar from "../component/RightSidebar";
import AllContext from "../contexts/AllContext";
import Loading from "../component/Loading";

function Profile() {
  const { loading, uri, accesstoken, setLoading, refresh } =
    useContext(AllContext);
  const [blog, setBlog] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${uri}/blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 403) {
          return refresh();
        }
      })
      .then((data) => setBlog(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${uri}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((er) => console.log(er))
      .finally(() => setLoading(false));
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
            <AllBlog blog={blog} users={users} />
            <Newblog />
            <br />
            <br />
            <br />
          </main>
          <div className="right-side">
            <br />
            <br />
            <RightSidebar users={users} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Profile;

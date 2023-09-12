import React, { useEffect } from "react";
import Newblog from "../component/Newblog";
import AllBlog from "../component/AllBlog";
import LeftSideBar from "../component/LeftSideBar";
import RightSidebar from "../component/RightSidebar";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, getuser } from "../redux/slice/BlogSlice";

function Profile() {
  const { accesstoken } = useSelector((state) => state.AuthSlice);
  const { users, user } = useSelector((state) => state.BlogSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(getuser());
    }
  }, []);
  useEffect(() => {
    if (accesstoken) {
      dispatch(getuser());
    }
  }, [accesstoken]);
  useEffect(() => {
    if (!users?.length) {
      dispatch(getUsers());
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

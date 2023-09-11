import ProfileUI from "../component/ProfileUl";
import React from "react";
import Newblog from "../component/Newblog";
import AllBlog from "../component/AllBlog";
import LeftSingleUser from "../component/LeftSingleUser";
import SingleUserHeading from "../component/SingleUserHeading";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../redux/slice/AuthSlice";
import {
  getBlog,
  getUsers,
  getComment,
  getLikes,
} from "../redux/slice/BlogSlice";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthSlice);
  const { users, blog, comment, like } = useSelector(
    (state) => state.BlogSlice
  );

  useEffect(() => {
    if (!like?.length) {
      dispatch(getLikes());
    }
  }, []);
  useEffect(() => {
    if (!user?.length) {
      dispatch(getuser());
    }
  }, []);
  useEffect(() => {
    if (!blog?.length) {
      dispatch(getBlog());
    }
  }, []);
  useEffect(() => {
    if (!users?.length) {
      dispatch(getUsers());
    }
  }, []);
  useEffect(() => {
    if (!comment?.length) {
      dispatch(getComment());
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

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CgProfile } from "react-icons/cg";
import Popup from "../component/Popup";
import AllBogSkeleton from "../component/AllBogSkeleton";
import { useSelector, useDispatch } from "react-redux";
import CommentBox from "../component/CommentBox";

import {
  setBlog,
  getBlog,
  getUsers,
  getComment,
  getLikes,
  getuser,
} from "../redux/slice/BlogSlice";
import LeftSideBar from "../component/LeftSideBar";
import AllComment from "../component/AllComment";
import AllLikes from "../component/AllLikes";

function SinglBlog() {
  const { uri } = useSelector((state) => state.AuthSlice);
  const { users, blog, comment, like, user } = useSelector(
    (state) => state.BlogSlice
  );
  const [errorMesage, , setErrorMessage] = useState(null);
  const params = useParams();
  const [singleBlog, setSingleBlog] = useState([]);
  const [text, setText] = useState();
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef();
  const editRef = useRef();
  const [bloger, setBloger] = useState([]);
  const [commenterId, setCommenterId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(getuser());
    }
  }, []);
  useEffect(() => {
    if (!blog) {
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
  useEffect(() => {
    if (!like?.length) {
      dispatch(getLikes());
    }
  }, []);

  useEffect(() => {
    const sblog = blog?.filter((value) => {
      return value?._id === params.id;
    });
    setSingleBlog(sblog);
  }, [blog]);

  const handleEdit = () => {
    formRef.current.style.display = "block";
    editRef.current.value = singleBlog[0]?.blog;
  };

  const handleDelete = () => {
    fetch(`${uri}/deleteblog/${params.id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        const newBlogs = blog?.filter((value) => {
          return value?._id !== data?._id;
        });
        dispatch(setBlog(newBlogs));
        navigate("../../blog");
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    fetch(`${uri}/editblog/${params.id}`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ blog: text }),
    })
      .then((res) => {
        if (res.ok) {
          navigate("../../blog");
        } else {
          setErrorMessage("something went wrong");
        }
      })
      .catch((err) => {
        setErrorMessage("something went wrong");
      });
  };
  //getting the bloger of the blog
  useEffect(() => {
    const blogUser = users?.filter((i) => i?._id === singleBlog[0]?.userid);
    setBloger(blogUser);
  }, [singleBlog]);

  return (
    <div className="blog">
      <div className="left-side">
        <br />
        <br />
        <LeftSideBar />
      </div>
      <main className="main" style={{ flexDirection: "column" }}>
        <br />
        <br />
        <br />
        <br />
        {!singleBlog?.length ? (
          <AllBogSkeleton cards={1} />
        ) : (
          <>
            <div
              className="blog-profile"
              style={{ width: "100%" }}
              onClick={() => navigate(`../profile/${singleBlog[0]?.userid}`)}
            >
              {/*displaying the blogers image */}
              {bloger?.length && bloger[0]?.image ? (
                <img
                  src={`${uri}/profile/${bloger[0]?._id}`}
                  alt="profile"
                  onClick={() =>
                    navigate(`../profile/${singleBlog[0]?.userid}`)
                  }
                />
              ) : (
                <CgProfile style={{ fontSize: "40px" }} />
              )}
              <span>
                <p style={{ fontWeight: "bolder" }}>
                  {singleBlog[0]?.username
                    ? singleBlog[0]?.username
                    : "no username"}
                </p>
                <p style={{ fontSize: "smaller", color: "grey" }}>
                  {bloger[0]?.email ? bloger[0]?.email : "no email"}
                </p>
              </span>
            </div>
            <div className="allblogs">
              <p className="blog-text">{singleBlog[0]?.blog}</p>
              {singleBlog[0]?.blogimagename && (
                <div className="single-blog-image">
                  <img
                    src={`${uri}/blogimage/${singleBlog[0]?._id}`}
                    alt="blogimage"
                  />
                </div>
              )}
              <p className="blog-date">{singleBlog[0]?.date.slice(0, 10)}</p>
            </div>
            <form
              className="edit-input"
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
            >
              <textarea
                type="text"
                onChange={(e) => setText(e.target.value)}
                ref={editRef}
              />
              <button onClick={handleUpdate}>Updata</button>
            </form>
            <div className="single-blog-edit" style={{ width: "100%" }}>
              <button onClick={() => navigate("../blog")}>
                {singleBlog[0]?.userid === user?._id ? "Cancle" : "Back"}
              </button>
              {singleBlog[0]?.userid === user?._id && (
                <>
                  {" "}
                  <button onClick={handleDelete}>Delete Blog</button>
                  <button onClick={() => handleEdit()}>Edit Blog</button>
                </>
              )}
            </div>
            <AllComment />
          </>
        )}
      </main>
      <div className="right-side">
        <br />
        <br />
        <AllLikes />
      </div>
      <CommentBox
        blogId={userId}
        setBlogId={setUserId}
        commenterId={commenterId}
        setCommenterId={setCommenterId}
      />
      {errorMesage && <Popup />}
    </div>
  );
}

export default SinglBlog;

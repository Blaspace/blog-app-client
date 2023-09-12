import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router";
import AllBogSkeleton from "./AllBogSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { FaRegCommentDots } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import CommentBox from "./CommentBox";
import {
  setLike,
  getLikes,
  getBlog,
  getComment,
} from "../redux/slice/BlogSlice";

function AllBlog() {
  const navigate = useNavigate();
  const { blog, users, comment, like, user } = useSelector(
    (state) => state.BlogSlice
  );
  const { uri } = useSelector((state) => state.AuthSlice);
  const [userId, setUserId] = useState(null);
  const [commenterId, setCommenterId] = useState(null);
  const dispatch = useDispatch();

  const handleComment = (blog, commenter) => {
    setUserId(blog);
    setCommenterId(commenter);
  };
  const handleLike = (e) => {
    if (user?._id) {
      const likeId = "like" + Math.random();
      dispatch(setLike([...like, { likeId, fromId: user?._id, blogId: e }]));
      fetch(`${uri}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId: e,
          fromId: user?._id,
          likeId,
        }),
      }).catch((err) => console.log(err));
    }
  };

  const handleUnlike = (e, likeId) => {
    const i = like.filter((l) => l.likeId !== likeId);
    dispatch(setLike(i));
    fetch(`${uri}/unlike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e,
        likeId,
      }),
    }).catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!blog?.length) {
      dispatch(getBlog());
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

  return (
    <>
      {!blog?.length && !users?.length ? (
        //skeleton loader
        <AllBogSkeleton cards={4} />
      ) : (
        blog?.map((value) => {
          //getting the bloger for each of the blog
          const bloger = users?.filter(
            (person) => person?._id === value?.userid
          );
          const blogComment = comment?.filter((i) => i?.blogId === value?._id);
          const blogLike = like?.filter((i) => i?.blogId === value?._id);
          const userLike = blogLike?.filter((i) => i?.fromId === user?._id);

          return (
            <div className="blog-con" key={value?._id}>
              <div
                className="blog-profile"
                onClick={() => navigate(`../profile/${value?.userid}`)}
              >
                {/*checking if the bloger has any image*/}
                {bloger[0]?.image ? (
                  <img
                    src={`${uri}/profile/${bloger[0]?._id}`}
                    alt="profile"
                    onClick={() => navigate(`../profile/${bloger?._id}`)}
                    style={{ border: "3px solid lightgrey" }}
                  />
                ) : (
                  <CgProfile
                    className="profile-icon"
                    onClick={() => navigate(`../profile/${value?.userid}`)}
                  />
                )}
                <span>
                  <p style={{ fontWeight: "450" }}>{value?.username}</p>
                  <p style={{ color: "grey", fontSize: "smaller" }}>
                    {bloger[0]?.email}
                  </p>
                </span>
              </div>
              <div
                className="allblogs"
                onClick={() => navigate(`/singleblog/${value?._id}`)}
              >
                <p className="blog-text">
                  {value?.blog && value?.blog.slice(0, 200)}
                  {value?.blog && value?.blog?.length > 200 && "..."}
                </p>
                {value?.blogimagename && (
                  <div className="blog-image">
                    <img
                      src={`${uri}/blogimage/${value._id}`}
                      alt="blogimage"
                    />
                  </div>
                )}
                <p className="blog-date">{value?.date?.slice(0, 10)}</p>
              </div>
              <div className="blog-action">
                <span>
                  {userLike?.length ? (
                    <AiFillLike
                      size={25}
                      color="blue"
                      onClick={() =>
                        handleUnlike(userLike[0]?._id, userLike[0]?.likeId)
                      }
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <BiLike
                      size={25}
                      color="rgb(58, 58, 58)"
                      onClick={() => handleLike(value?._id)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  <small>{blogLike?.length}</small>
                </span>
                <span
                  onClick={() => handleComment(value._id, bloger[0]._id)}
                  style={{ cursor: "pointer" }}
                >
                  <FaRegCommentDots size={25} color="rgb(58, 58, 58)" />
                  <small>{blogComment?.length}</small>
                </span>
              </div>
            </div>
          );
        })
      )}
      <CommentBox
        blogId={userId}
        setBlogId={setUserId}
        commenterId={commenterId}
        setCommenterId={setCommenterId}
      />
      <br />
    </>
  );
}

export default AllBlog;

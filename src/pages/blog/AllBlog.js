import React, { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router";
import AllBogSkeleton from "./AllBogSkeleton";
import { FaRegCommentDots } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import CommentBox from "./CommentBox";
import AllContext from "../../contexts/AllContext";
import BlogContext from "../../contexts/BlogContext";

function AllBlog() {
  const navigate = useNavigate();
  const { blog, users, comment, like, setBlog, setLike, setComment, setUsers } =
    useContext(BlogContext);
  const { uri, user, refresh } = useContext(AllContext);
  const [userId, setUserId] = useState(null);
  const [commenterId, setCommenterId] = useState(null);

  const handleComment = (b, c) => {
    setUserId(b);
    setCommenterId(c);
  };
  useEffect(() => {
    if (!users) {
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

  useEffect(() => {
    if (!like?.length) {
      fetch(`${uri}/alllike`, {
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
        .then((data) => setLike(data))
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (!blog) {
      fetch(`${uri}/blog`, {
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
        .then((data) => setBlog(data?.reverse()));
    }
  }, []);

  useEffect(() => {
    if (!comment?.length) {
      fetch(`${uri}/getcomment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 400) {
            throw "an error";
          }
        })
        .then((data) => setComment(data))
        .catch((err) => console.log(err));
    }
  });

  const handleLike = (e) => {
    if (user?._id) {
      const likeId = "like" + Math.random();
      setLike([...like, { likeId, fromId: user?._id, blogId: e }]);
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
    setLike(i);
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
                {bloger[0]?.hasimage ? (
                  <img
                    src={`${uri}/profile/${bloger[0]?._id}`}
                    alt="profile"
                    onClick={() => navigate(`../profile/${bloger?._id}`)}
                    style={{ border: "2px solid lightgrey" }}
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
                {value?.hasimage && (
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
                  onClick={() => handleComment(value?._id, user?._id)}
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

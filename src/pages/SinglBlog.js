import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CgProfile } from "react-icons/cg";
import AllContext from "../contexts/AllContext";
import Popup from "../component/Popup";
import AllBogSkeleton from "../component/AllBogSkeleton";
import BlogContext from "../contexts/BlogContext";

function SinglBlog() {
  const { user, uri } = useContext(AllContext);
  const { users, blog, setBlog } = useContext(BlogContext);
  const [errorMesage, , setErrorMessage] = useState(null);
  const params = useParams();
  const [singleBlog, setSingleBlog] = useState([]);
  const [text, setText] = useState();
  const navigate = useNavigate();
  const formRef = useRef();
  const editRef = useRef();
  const [bloger, setBloger] = useState([]);

  useEffect(() => {
    const sblog = blog?.filter((value) => {
      return value?._id === params.id;
    });
    setSingleBlog(sblog);
  }, [blog]);

  const handleEdit = () => {
    formRef.current.style.display = "block";
    editRef.current.value = singleBlog.blog;
  };

  const handleDelete = () => {
    fetch(`${uri}/deleteblog/${params.id}`, {
      method: "POST",
    })
      .then((data) => {
        const newBlogs = blog.filter((value) => {
          return value?._id !== data?._id;
        });
        setBlog(newBlogs);
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
    <div className="single-blog-con">
      <div className="single-blog">
        {!singleBlog?.length ? (
          <AllBogSkeleton cards={1} />
        ) : (
          <>
            <div
              className="blog-profile"
              onClick={() => navigate(`../profile/${singleBlog[0]?.userid}`)}
            >
              {/*displaying the blogers image */}
              {bloger?.length && bloger[0]?.image ? (
                <img
                  src={`${uri}/blogimage/${bloger[0]?.image}`}
                  alt="profile"
                  onClick={() => navigate(`../profile/${bloger?._id}`)}
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
                    src={`${uri}/blogimage/${singleBlog[0]?.blogimagename}`}
                    alt="blogimage"
                  />
                </div>
              )}
              <p className="blog-date">{singleBlog[0]?.date}</p>
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
              <button onClick={handleUpdate}>updata</button>
            </form>
            <div className="single-blog-edit">
              <button onClick={() => navigate("../blog")}>
                {singleBlog[0]?.userid === user?._id ? "cancle" : "Back"}
              </button>
              {singleBlog[0]?.userid === user?._id && (
                <>
                  {" "}
                  <button onClick={handleDelete}>Delete Blog</button>
                  <button onClick={() => handleEdit()}>Edit Blog</button>
                </>
              )}
            </div>
            <br />
          </>
        )}
      </div>
      {errorMesage && <Popup />}
    </div>
  );
}

export default SinglBlog;

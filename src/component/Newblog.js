import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import AllContext from "../contexts/AllContext";
import { CgProfile } from "react-icons/cg";
import Skeleton from "react-loading-skeleton";
import BlogContext from "../contexts/BlogContext";

function Newblog() {
  const btnref = useRef();
  const inputref = useRef();
  const { user, uri } = useContext(AllContext);
  const { blog, setBlog } = useContext(BlogContext);
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState();
  const [newblog, setNewBlog] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const typing = (e) => {
    inputref.current.style.height = "100px";
    btnref.current.style.display = "block";
    setNewBlog(e.target.value);
    setMessage("");
    if (e.target.value === "") {
      btnref.current.style.display = "none";
      inputref.current.style.height = "40px";
    }
  };

  const imgChage = (e) => {
    btnref.current.style.display = "block";
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };
  const change = () => {
    inputref.current.style.height = "100px";
  };

  const handleSubmit = () => {
    btnref.current.disabled = true;
    btnref.current.style.backgroundColor = "lightblue";
    btnref.current.innerText = "loading...";

    const date = new Date();
    const formData = new FormData();
    if (user.image !== undefined) {
      formData.append("profile", image);
      formData.append("date", date);
      formData.append("blog", newblog);
      formData.append("username", user.name);
      formData.append("userid", user._id);
    }
    fetch(`${uri}/newblog`, {
      method: "POST",
      dataType: "jsonp",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 400) {
          setMessage("image file too large");
        } else if (res.status === 402) {
          setMessage("blog not posted try again");
        } else if (res.status === 500) {
          setMessage("server error");
        } else {
          setMessage("error try again");
        }
      })
      .then((data) => {
        if (data) {
          setBlog([...blog, data]);
          setMessage("blog posted");
        }
        setNewBlog("");
        setImageName("");
      })
      .catch((err) => console.error(err))
      .finally(() => {
        btnref.current.disabled = false;
        btnref.current.style.backgroundColor = "navy";
        btnref.current.innerText = "submit";
        btnref.current.style.display = "none";
        inputref.current.style.height = "40px";
      });
  };

  return (
    <>
      <div className="newblog">
        <form onSubmit={(e) => e.preventDefault()}>
          {message && message === "blog posted" ? (
            <p
              style={{
                textAlign: "center",
                color: "green",
                fontWeight: "bolder",
              }}
            >
              {message}
            </p>
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "red",
                fontWeight: "bolder",
              }}
            >
              {message}
            </p>
          )}
          <div className="newBlog-input">
            <>
              {!user ? (
                <Skeleton
                  circle
                  height={"50px"}
                  width={"50px"}
                  style={{ marginRight: "10px" }}
                />
              ) : user?.image ? (
                <img
                  src={`${uri}/profile/${user?.image}`}
                  alt="profile"
                  onClick={() => navigate(`../profile/${user?._id}`)}
                />
              ) : (
                <CgProfile
                  className="profile-icon"
                  onClick={() => navigate(`../profile/${user._id}`)}
                />
              )}
            </>
            <textarea
              type="text"
              placeholder="Create a blog"
              ref={inputref}
              name="blog"
              onClick={() => change()}
              onChange={(e) => typing(e)}
              value={newblog}
            />
          </div>
          <button ref={btnref} onClick={() => handleSubmit()}>
            submit
          </button>
          <h5>{imageName && imageName.slice(0, 8)}</h5>
        </form>
        <div className="newblog-base">
          <div>
            <h3>
              <input type="file" onChange={(e) => imgChage(e)} />
              add image
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newblog;

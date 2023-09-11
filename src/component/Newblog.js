import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";
import { setBlog } from "../redux/slice/BlogSlice";
import { MdAddPhotoAlternate } from "react-icons/md";

function Newblog() {
  const btnref = useRef();
  const inputref = useRef();
  const { user, uri } = useSelector((state) => state.AuthSlice);
  const { blog } = useSelector((state) => state.BlogSlice);
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState();
  const [newblog, setNewBlog] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (image) {
      formData.append("profile", image);
      formData.append("date", date);
      formData.append("blog", newblog);
      formData.append("username", user.name);
      formData.append("userid", user._id);
    } else {
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
        } else if (res.status === 402 || res.status === 400) {
          setMessage("blog not posted try again");
        } else if (res.status === 500) {
          setMessage("server error");
        } else {
          setMessage("error try again");
        }
      })
      .then((data) => {
        if (data) {
          dispatch(setBlog([data, ...blog]));
          setMessage("blog posted");
        }
        setNewBlog("");
        setImageName("");
      })
      .catch((err) => console.error(err))
      .finally(() => {
        btnref.current.disabled = false;
        setImage(null);

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
                  src={`${uri}/profile/${user?._id}`}
                  alt="profile"
                  onClick={() => navigate(`../profile/${user?._id}`)}
                  style={{ border: "3px solid lightgrey" }}
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
            <h3 style={{ display: "flex", alignItems: "center" }}>
              <input
                type="file"
                onChange={(e) => imgChage(e)}
                accept="image/*"
              />
              <MdAddPhotoAlternate size={30} /> <span>add image</span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newblog;

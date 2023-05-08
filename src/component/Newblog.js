import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import AllContext from "../contexts/AllContext";
import prof from "../utils/profile.jpg";
import useFetchBlog from "../hooks/useFetchBlog";

function Newblog() {
  const btnref = useRef();
  const handleGetBlog = useFetchBlog();
  const inputref = useRef();
  const { user } = useContext(AllContext);
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState();
  const [newblog, setNewBlog] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { uri } = useContext(AllContext);

  const typing = (e) => {
    inputref.current.style.height = "100px";
    btnref.current.style.display = "block";
    setNewBlog(e.target.value);
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
          setMessage("blog posted");
          setNewBlog("");
          setImageName("");
          btnref.current.style.display = "none";
          inputref.current.style.height = "40px";
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
      .then(() => handleGetBlog())
      .catch((err) => setMessage(err));
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
            {user.image && Object.keys(user.image).length !== 0 ? (
              <img
                src={`data:image;base64,${btoa(
                  String.fromCharCode(...new Uint8Array(user.image.data.data))
                )}`}
                alt="profile"
                onClick={() => navigate(`../profile/${user._id}`)}
              />
            ) : (
              <img
                src={prof}
                alt="profile"
                onClick={() => navigate(`../profile/${user._id}`)}
              />
            )}
            <textarea
              type="text"
              placeholder="Create a blog"
              ref={inputref}
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

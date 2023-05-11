import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import prof from "../utils/profile.jpg";
import AllContext from "../contexts/AllContext";
import useFetchBlog from "../hooks/useFetchBlog";
import Loading from "../component/Loading";
import Popup from "../component/Popup";

function SinglBlog() {
  const {
    user,
    users,
    uri,
    loading,
    setLoading,
    errorMesage,
    setErrorMessage,
  } = useContext(AllContext);
  const params = useParams();
  const [singleBlog, setSinglBlog] = useState({});
  const [text, setText] = useState();
  const navigate = useNavigate();
  const getBlog = useFetchBlog();
  const formRef = useRef();
  const editRef = useRef();
  const [bloger, setBloger] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(`${uri}/singleblog/${params.id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setSinglBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        navigate("../../");
      });
  }, []);

  const handleEdit = () => {
    formRef.current.style.display = "block";
    editRef.current.value = singleBlog.blog;
  };

  const handleDelete = () => {
    setLoading(true);
    fetch(`${uri}/deleteblog/${params.id}`, {
      method: "POST",
    })
      .then(() => {
        getBlog();
        setLoading(false);
        navigate("../../blog");
      })
      .catch((err) => console.log(err));
  };
  const handleUpdate = () => {
    setLoading(true);
    fetch(`${uri}/editblog/${params.id}`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ blog: text }),
    })
      .then((res) => {
        if (res.ok) {
          getBlog();
          setLoading(false);
          navigate("../../blog");
        } else {
          setErrorMessage("something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage("something went wrong");
      });
  };
  //getting the bloger of the blog
  useEffect(() => {
    if (singleBlog) {
      setBloger(users.filter((i) => i._id === singleBlog.userid));
    }
  }, [singleBlog]);

  return (
    <div className="single-blog-con">
      <div className="single-blog">
        <div
          className="blog-profile"
          onClick={() => navigate(`../profile/${singleBlog.userid}`)}
        >
          {/*displaying the blogers image */}

          {bloger.length &&
          bloger[0].image &&
          Object.keys(bloger[0].image).length !== 0 ? (
            <img
              src={`data:image;base64,${btoa(
                String.fromCharCode(
                  ...new Uint8Array(bloger[0].image.data.data)
                )
              )}`}
              alt="profile"
              onClick={() => navigate(`../profile/${bloger._id}`)}
            />
          ) : (
            <img src={prof} alt="profile" />
          )}
          <h5>{singleBlog.username ? singleBlog.username : "no username"}</h5>
        </div>
        <div className="allblogs">
          <h4>{singleBlog.blog}</h4>
          <div className="blog-image">
            {singleBlog.blogimage &&
            Object.keys(singleBlog.blogimage).length !== 0 ? (
              <img
                src={`data:image;base64,${btoa(
                  String.fromCharCode(
                    ...new Uint8Array(singleBlog.blogimage.data.data)
                  )
                )}`}
                alt="blogimage"
              />
            ) : (
              ""
            )}
          </div>
          <p>{singleBlog.date}</p>
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
            {singleBlog.userid === user._id ? "cancle" : "Back"}
          </button>
          {singleBlog.userid === user._id && (
            <>
              {" "}
              <button onClick={handleDelete}>Delete Blog</button>
              <button onClick={() => handleEdit()}>Edit Blog</button>
            </>
          )}
        </div>
      </div>
      {loading && <Loading />}
      {errorMesage && <Popup />}
    </div>
  );
}

export default SinglBlog;

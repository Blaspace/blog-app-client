import React, { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useParams } from "react-router";
import { MdCameraAlt } from "react-icons/md";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import AllContext from "../contexts/AllContext";
import BlogContext from "../contexts/BlogContext";

function SingleUserHeading() {
  const params = useParams();
  const { uri, user } = useContext(AllContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const { users } = useContext(BlogContext);
  const [singleUser, setSingleUser] = useState("");

  useEffect(() => {
    const foundUser = users.filter((user) => user._id === params.id);
    setSingleUser(foundUser);
  }, [users]);
  const profilrUpload = (e) => {
    const formData = new FormData();
    formData.append("profile", e.target.files[0]);

    fetch(`${uri}/profileimage/${params.id}`, {
      method: "POST",
      dataType: "jsonp",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        setErrorMessage("uploaded");
      } else if (res.status === 400) {
        setErrorMessage("image file too large");
      } else {
        setErrorMessage("server error");
      }
    });
  };

  const obj = singleUser.image;
  return (
    <>
      <Popup errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      <header className="profile-header">
        <div className="profile-img">
          {singleUser?.length && singleUser[0]?.image ? (
            <img src={`${uri}/profile/${singleUser[0]?._id}`} alt="profile" />
          ) : (
            <CgProfile className="user-profile-icon" />
          )}
          {singleUser && user?._id === singleUser[0]?._id && (
            <span>
              <input
                type="file"
                name="profile"
                onChange={(e) => profilrUpload(e)}
                accept="image/*"
              />
              <MdCameraAlt className="img-upload" />
            </span>
          )}
          <p style={{ fontSize: "20px" }}>
            {singleUser && singleUser[0]?.username}
          </p>
        </div>
      </header>
    </>
  );
}

export default SingleUserHeading;

import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import cam from "../utils/cam.jpg";
import { useParams } from "react-router";
import AllContext from "../contexts/AllContext";
import { MdCameraAlt } from "react-icons/md";
import Popup from "./Popup";

function SingleUserHeading({ singleUser, setSingleUser }) {
  const params = useParams();
  const { user, uri } = useContext(AllContext);
  const [errorMessage, setErrorMessage] = useState(null);

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
          {singleUser?.image && Object.keys(obj).length !== 0 ? (
            <img
              src={`data:image;base64,${btoa(
                String.fromCharCode(
                  ...new Uint8Array(singleUser?.image?.data?.data)
                )
              )}`}
              alt="profile"
            />
          ) : (
            <CgProfile className="user-profile-icon" />
          )}
          {singleUser && user?._id === singleUser?._id && (
            <span>
              <input
                type="file"
                name="profile"
                onChange={(e) => profilrUpload(e)}
              />
              <MdCameraAlt className="img-upload" />
            </span>
          )}
          <h3>{singleUser && singleUser?.name}</h3>
        </div>
      </header>
    </>
  );
}

export default SingleUserHeading;

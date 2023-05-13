import React, { useContext, useState } from "react";
import prof from "../utils/profile.jpg";
import cam from "../utils/cam.jpg";
import { useParams } from "react-router";
import AllContext from "../contexts/AllContext";
import useFetchSingleUser from "../hooks/useFetchSingleUser";
import useFetchUser from "../hooks/useFetchUser";
import Popup from "./Popup";

function SingleUserHeading({ singleUser, setSingleUser }) {
  const params = useParams();
  const handleFetchUser = useFetchSingleUser();
  const handleGetUser = useFetchUser();
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
        handleFetchUser(params.id, setSingleUser);
        handleGetUser();
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
          {singleUser.image && Object.keys(obj).length !== 0 ? (
            <img
              src={`data:image;base64,${btoa(
                String.fromCharCode(
                  ...new Uint8Array(singleUser.image.data.data)
                )
              )}`}
              alt="profile"
            />
          ) : (
            <img src={prof} alt="profile" />
          )}
          {singleUser && user._id === singleUser._id && (
            <span>
              <input
                type="file"
                name="profile"
                onChange={(e) => profilrUpload(e)}
              />
              <img src={cam} alt="img" />
            </span>
          )}
          <h3>{singleUser && singleUser.name}</h3>
        </div>
      </header>
    </>
  );
}

export default SingleUserHeading;

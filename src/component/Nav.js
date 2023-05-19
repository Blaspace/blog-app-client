import React, { useContext } from "react";
import prof from "../utils/profile.jpg";
import fbicon from "../utils/fbi.png";
import AllContext from "../contexts/AllContext";
import { useNavigate } from "react-router";
import friends from "../utils/friends.png";

function Nav() {
  const { user } = useContext(AllContext);
  const navigate = useNavigate();
  return (
    <div className="nav">
      <div onClick={() => navigate("../blog")}>
        <img src={fbicon} alt="profile" />
      </div>
      <div className="friends-icon" onClick={() => navigate("../friends")}>
        <img src={friends} alt="" />
      </div>
      <div>
        <h1>
          EX<span>PO</span>
        </h1>
      </div>
      <div
        className="nav-profile"
        onClick={() => navigate(`../profile/${user?._id}`)}
      >
        {user?.image && Object.keys(user?.image).length !== 0 ? (
          <img
            src={`data:image;base64,${btoa(
              String.fromCharCode(...new Uint8Array(user?.image?.data?.data))
            )}`}
            alt="profile"
            onClick={() => navigate(`../profile/${user?._id}`)}
          />
        ) : (
          <img
            src={prof}
            alt="profile"
            onClick={() => navigate(`../profile/${user?._id}`)}
          />
        )}
        <h4>{user?.name}</h4>
      </div>
    </div>
  );
}

export default Nav;

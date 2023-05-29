import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends, FaBlog } from "react-icons/fa";
import AllContext from "../contexts/AllContext";
import { useNavigate } from "react-router";

function Nav() {
  const { user } = useContext(AllContext);
  const navigate = useNavigate();
  return (
    <div className="nav">
      <div onClick={() => navigate("../blog")}>
        <FaBlog style={{ fontSize: "30px" }} />
      </div>
      <div className="friends-icon" onClick={() => navigate("../friends")}>
        <FaUserFriends style={{ fontSize: "40px" }} />
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
          <CgProfile
            className="profile-icon"
            onClick={() => navigate(`../profile/${user._id}`)}
          />
        )}
        <h4>{user?.name}</h4>
      </div>
    </div>
  );
}

export default Nav;

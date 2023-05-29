import React, { useContext } from "react";
import AllContext from "../contexts/AllContext";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router";

function LeftSideBar() {
  const { user, logOut } = useContext(AllContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="left-sidebar">
        <div
          className="left-sidebar-header"
          onClick={() => navigate(`../profile/${user._id}`)}
        >
          {user?.image && Object.keys(user?.image).length !== 0 ? (
            <img
              src={`data:image;base64,${btoa(
                String.fromCharCode(...new Uint8Array(user?.image?.data?.data))
              )}`}
              alt="profile"
              onClick={() => navigate(`../profile/${user._id}`)}
            />
          ) : (
            <>
              <CgProfile className="left-profile-icon" />
              <br />
            </>
          )}
          <p>
            {user?.name}
            <br />
            <span>{user?.email}</span>
          </p>
        </div>
        <br />
        <ul className="left-list">
          <li>Red table talk group</li>
          <li onClick={() => navigate("../friends")}>
            <FaUserFriends style={{ fontSize: "30px", marginRight: "10px" }} />
            <span style={{ fontSize: "larger", marginBottom: "20px" }}>
              Friends
            </span>
          </li>
          <li onClick={logOut} className="logout">
            Logout
          </li>
        </ul>
      </div>
    </>
  );
}

export default LeftSideBar;

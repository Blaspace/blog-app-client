import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import AllContext from "../../contexts/AllContext";

function LeftSideBar() {
  const { uri, user, logOut } = useContext(AllContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
  };
  return (
    <>
      <div className="left-sidebar">
        <div
          className="left-sidebar-header"
          onClick={() => navigate(`../profile/${user._id}`)}
        >
          {user?.hasimage ? (
            <>
              {!user ? (
                <Skeleton circle height={"60px"} width={"60px"} />
              ) : (
                <img
                  src={`${uri}/profile/${user._id}`}
                  alt="profile"
                  onClick={() => navigate(`../profile/${user._id}`)}
                  style={{ border: "3px solid gray" }}
                />
              )}
            </>
          ) : (
            <>
              {!user ? (
                <Skeleton circle height={"60px"} width={"60px"} />
              ) : (
                <CgProfile className="left-profile-icon" />
              )}
              <br />
            </>
          )}
          <p>
            {!user ? (
              <Skeleton
                height={"20px"}
                width={"200px"}
                style={{ marginLeft: "5px" }}
              />
            ) : (
              <>
                {user?.username}
                <br />
                <span style={{ color: "gray", fontSize: "small" }}>
                  {user?.email}
                </span>
              </>
            )}
          </p>
        </div>
        <br />
        <ul className="left-list">
          <li>Red table talk group</li>
          <li
            onClick={() => navigate("../friends")}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaUserFriends style={{ fontSize: "30px", marginRight: "10px" }} />
            <span>Friends</span>
          </li>
          <li onClick={handleLogout} className="logout">
            Logout
          </li>
        </ul>
      </div>
    </>
  );
}

export default LeftSideBar;

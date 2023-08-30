import React, { useContext } from "react";
import AllContext from "../contexts/AllContext";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";

function LeftSideBar() {
  const { user, logOut, uri } = useContext(AllContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="left-sidebar">
        <div
          className="left-sidebar-header"
          onClick={() => navigate(`../profile/${user._id}`)}
        >
          {user?.image ? (
            <>
              {!user ? (
                <Skeleton circle height={"60px"} width={"60px"} />
              ) : (
                <img
                  src={`${uri}/profile/${user.image}`}
                  alt="profile"
                  onClick={() => navigate(`../profile/${user._id}`)}
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
                {user?.name}
                <br />
                <span style={{ color: "gray" }}>{user?.email}</span>
              </>
            )}
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

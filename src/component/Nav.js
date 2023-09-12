import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends, FaBlog } from "react-icons/fa";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import AllContext from "../contexts/AllContext";

function Nav() {
  const { uri, user } = useContext(AllContext);
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
        {user?.image ? (
          <>
            {!user ? (
              <Skeleton
                circle
                height={"35px"}
                width={"35px"}
                baseColor="#cfd1d5"
                highlightColor="#ecf3ff"
              />
            ) : (
              <img
                src={`${uri}/profile/${user?._id}`}
                alt="profile"
                onClick={() => navigate(`../profile/${user?._id}`)}
                style={{ border: "3px solid lightgrey" }}
              />
            )}
          </>
        ) : (
          <>
            {!user ? (
              <Skeleton
                circle
                height={"50px"}
                width={"50px"}
                baseColor="#cfd1d5"
                highlightColor="#ecf3ff"
              />
            ) : (
              <CgProfile
                className="profile-icon"
                onClick={() => navigate(`../profile/${user._id}`)}
              />
            )}
          </>
        )}
        <h4>
          {!user ? (
            <Skeleton
              height={"10px"}
              width={"100px"}
              baseColor="#cfd1d5"
              highlightColor="#ecf3ff"
            />
          ) : (
            user?.name
          )}
        </h4>
      </div>
    </div>
  );
}

export default Nav;

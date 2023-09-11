import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import SkeletonRightSideBar from "./SkeletonRightSideBar";
import { useSelector } from "react-redux";

function RightSidebar() {
  const [Users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user, uri } = useSelector((state) => state.AuthSlice);
  const { users } = useSelector((state) => state.BlogSlice);
  useEffect(() => {
    if (users?.length) {
      const otherUsers = users?.filter((value) => value?._id !== user?._id);
      setUsers(otherUsers);
    }
  }, [users]);

  const handleProfile = (e) => {
    navigate(`../profile/${e}`);
  };

  return (
    <ul className="right-sidebar">
      {!Users?.length ? (
        <SkeletonRightSideBar />
      ) : Users?.length ? (
        Users?.slice(0, 6).map((value) => {
          return (
            <li
              key={value._id}
              onClick={() => {
                handleProfile(value._id);
              }}
              style={{ borderBottom: "1px solid grey" }}
            >
              {value?.image ? (
                <img
                  src={`${uri}/profile/${value?._id}`}
                  alt="profile"
                  onClick={() => navigate(`../profile/${user?._id}`)}
                  style={{ border: "3px solid gray" }}
                />
              ) : (
                <CgProfile
                  className="profile-icon"
                  onClick={() => navigate(`../profile/${value.userid}`)}
                />
              )}
              <span>{value?.username}</span>
            </li>
          );
        })
      ) : (
        <h4>no user</h4>
      )}
      {Users?.length > 6 && <p onClick={() => navigate("../friends")}>...</p>}
    </ul>
  );
}

export default RightSidebar;

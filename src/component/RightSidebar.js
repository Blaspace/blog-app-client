import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AllContext from "../contexts/AllContext";
import { CgProfile } from "react-icons/cg";
import SkeletonRightSideBar from "./SkeletonRightSideBar";

function RightSidebar({ users }) {
  const [Users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AllContext);

  useEffect(() => {
    if (users.length) {
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
        Users.slice(0, 6).map((value) => {
          return (
            <li
              key={value._id}
              onClick={() => {
                handleProfile(value._id);
              }}
            >
              {value?.image !== undefined ? (
                <img
                  src={`data:image;base64,${btoa(
                    String.fromCharCode(
                      ...new Uint8Array(value?.image?.data?.data)
                    )
                  )}`}
                  alt="profile"
                  onClick={() => navigate(`../profile/${user?._id}`)}
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

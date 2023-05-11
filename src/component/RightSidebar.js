import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AllContext from "../contexts/AllContext";
import prof from "../utils/profile.jpg";

function RightSidebar() {
  const [Users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { users, user } = useContext(AllContext);

  useEffect(() => {
    if (users.length) {
      const otherUsers = users.filter((value) => value._id !== user._id);
      setUsers(otherUsers);
    }
  }, [users]);

  const handleProfile = (e) => {
    navigate(`../profile/${e}`);
  };

  return (
    <ul className="right-sidebar">
      {Users.length ? (
        Users.slice(0, 6).map((value) => {
          return (
            <li
              key={value._id}
              onClick={() => {
                handleProfile(value._id);
              }}
            >
              {value.image !== undefined ? (
                <img
                  src={`data:image;base64,${btoa(
                    String.fromCharCode(
                      ...new Uint8Array(value.image.data.data)
                    )
                  )}`}
                  alt="profile"
                  onClick={() => navigate(`../profile/${user._id}`)}
                />
              ) : (
                <img
                  src={prof}
                  alt="profile"
                  onClick={() => navigate(`../profile/${user._id}`)}
                />
              )}
              <span>{value.username}</span>
            </li>
          );
        })
      ) : (
        <h4>no user</h4>
      )}
      {Users.length > 6 && <p onClick={() => navigate("../friends")}>...</p>}
    </ul>
  );
}

export default RightSidebar;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AllContext from "../contexts/AllContext";
import prof from "../utils/profile.jpg";

function Friends() {
  const [Users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { users } = useContext(AllContext);
  const { user } = useContext(AllContext);

  useEffect(() => {
    if (users.length) {
      const otherUsers = users.filter((value) => value._id !== user._id);
      setUsers(otherUsers);
    }
  }, [users, user._id]);

  const handleProfile = (e) => {
    navigate(`../profile/${e}`);
  };
  return (
    <div className="friends-con">
      <br />
      <ul className="friends">
        <h1 style={{ textAlign: "center" }}>
          <i>friends on this app</i>
        </h1>
        {Users.length ? (
          Users.map((value) => {
            return (
              <li
                key={value._id}
                onClick={() => {
                  handleProfile(value._id);
                }}
              >
                {value.image ? (
                  <img
                    src={`data:image;base64,${btoa(
                      String.fromCharCode(
                        ...new Uint8Array(value.image.data.data)
                      )
                    )}`}
                    alt="profile"
                  />
                ) : (
                  <img
                    src={prof}
                    alt="profile"
                    onClick={() => navigate(`../profile/${user._id}`)}
                  />
                )}
                <p>
                  <span>{value.username}</span>
                  <span style={{ color: "gray" }}>{value.email}</span>
                </p>
              </li>
            );
          })
        ) : (
          <h4>no user</h4>
        )}
      </ul>
    </div>
  );
}

export default Friends;

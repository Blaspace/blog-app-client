import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AllContext from "../contexts/AllContext";
import { CgProfile } from "react-icons/cg";
import FriendsSkeleton from "../component/FriendsSkeleton";

function Friends() {
  const [newUsers, setNewUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user, uri, accesstoken } = useContext(AllContext);

  useEffect(() => {
    fetch(`${uri}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    if (users?.length) {
      const otherUsers = users.filter((value) => value._id !== user._id);
      setNewUsers(otherUsers);
    }
  }, [users]);

  const handleProfile = (e) => {
    navigate(`../profile/${e}`);
  };
  return (
    <div className="friends-con">
      <br />
      <br />
      <ul className="friends">
        <h1 style={{ textAlign: "center" }}>
          <i>friends on this app</i>
        </h1>
        {!newUsers.length ? (
          <FriendsSkeleton cards={5} />
        ) : newUsers.length ? (
          newUsers?.map((value) => {
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
                  <CgProfile style={{ fontSize: "50px" }} />
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

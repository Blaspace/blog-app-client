import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import FriendsSkeleton from "../component/FriendsSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { getuser } from "../redux/slice/AuthSlice";
import { getUsers } from "../redux/slice/BlogSlice";

function Friends() {
  const [newUsers, setNewUsers] = useState([]);
  const navigate = useNavigate();
  const { user, uri } = useSelector((state) => state.AuthSlice);
  const { users } = useSelector((state) => state.BlogSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user?.length) {
      dispatch(getuser());
    }
  }, []);
  useEffect(() => {
    if (!users?.length) {
      dispatch(getUsers());
    }
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
                  <img src={`${uri}/profile/${value?._id}`} alt="profile" />
                ) : (
                  <CgProfile style={{ fontSize: "50px" }} />
                )}
                <p>
                  <span>{value?.username}</span>
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

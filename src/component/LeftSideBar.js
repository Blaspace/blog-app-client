import React, { useContext } from "react";
import AllContext from "../contexts/AllContext";
import useLogout from "../hooks/useLogout";
import prof from "../utils/profile.jpg";
import flag from "../utils/flag.png";
import friends from "../utils/friends.png";
import save from "../utils/save.png";
import setting from "../utils/setting.png";
import event from "../utils/event.png";
import { useNavigate } from "react-router";

function LeftSideBar({ singlUser }) {
  const { user } = useContext(AllContext);
  const handleLogout = useLogout();
  const navigate = useNavigate();

  return (
    <>
      <div className="left-sidebar">
        <div
          className="left-sidebar-header"
          onClick={() => navigate(`../profile/${user._id}`)}
        >
          {user.image && Object.keys(user.image).length !== 0 ? (
            <img
              src={`data:image;base64,${btoa(
                String.fromCharCode(...new Uint8Array(user.image.data.data))
              )}`}
              alt="profile"
              onClick={() => navigate(`../profile/${user._id}`)}
            />
          ) : (
            <img src={prof} alt="profile" />
          )}
          <h4>{user.name}</h4>
          <h3>{user.email}</h3>
        </div>
        <br />
        <ul className="left-list">
          <li>Red table talk group</li>
          <li>
            <img src={event} alt="event" /> Events
          </li>
          <li>
            <img src={save} alt="" />
            Saved
          </li>
          <li>
            <img src={flag} alt="flag" />
            Pages
          </li>
          <li onClick={() => navigate("../friends")}>
            <img src={friends} alt="friend" />
            Friends
          </li>
          <li>
            <img src={setting} alt="" />
            Settings & Privacy
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

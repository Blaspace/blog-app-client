import React from "react";
import { useNavigate } from "react-router";

function ProfileHeader() {
  const navigate = useNavigate();
  return (
    <>
      <ul className="porfile-ul">
        <li onClick={() => navigate("../friends")}>Friends</li>
        <li onClick={() => navigate("../blog")}>Blog</li>
      </ul>
    </>
  );
}

export default ProfileHeader;

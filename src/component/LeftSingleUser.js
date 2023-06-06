import React, { useContext } from "react";
import { useNavigate } from "react-router";
import AllContext from "../contexts/AllContext";
import Skeleton from "react-loading-skeleton";

function LeftSingleUser({ singleUser }) {
  const { user, uri, logOut, setAccesstoken } = useContext(AllContext);
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    fetch(`${uri}/deleteuser`, {
      method: "POST",
      credentials: "include",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ _id: singleUser._id }),
    }).then(() => {
      setAccesstoken("");
    });
  };
  return (
    <div className="profile-left">
      <section>
        <h2>Intro</h2>
        <article>
          {singleUser && singleUser?.bio !== undefined ? (
            singleUser.bio
          ) : (
            <>
              <p>add a short bio to tell people about yourself</p>
            </>
          )}
        </article>
      </section>
      <hr />
      <div className="profile-info">
        <ul>
          <li>
            {singleUser && singleUser?.school === undefined ? (
              "add an institution!"
            ) : (
              <p>
                studied at :
                <b>{!singleUser ? <Skeleton /> : singleUser?.school}</b>
              </p>
            )}
          </li>
          <li>
            {singleUser && singleUser?.job === undefined ? (
              "add your job!"
            ) : (
              <p>
                works at :{" "}
                <b> {!singleUser ? <Skeleton /> : singleUser?.job}</b>{" "}
              </p>
            )}
          </li>
          <li>
            {singleUser && singleUser?.city === undefined ? (
              "add your city!"
            ) : (
              <p>
                live at :
                <b> {!singleUser ? <Skeleton /> : singleUser?.city} </b>
              </p>
            )}
          </li>
          <li>
            {singleUser && singleUser?.state === undefined ? (
              "add your state!"
            ) : (
              <p>
                from : <b>{!singleUser ? <Skeleton /> : singleUser?.state} </b>
              </p>
            )}
          </li>
        </ul>
        {singleUser && user?._id === singleUser._id && (
          <>
            <button
              onClick={() => navigate(`../editprofile/${singleUser?._id}`)}
              style={{ background: "#cfd1cf" }}
            >
              Edit Details
            </button>
            <button onClick={logOut} style={{ background: "#cfd1cf" }}>
              <span>log out</span>
            </button>
            <button
              onClick={handleDeleteAccount}
              style={{ background: "#cfd1cf" }}
            >
              <span>close this accout</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LeftSingleUser;

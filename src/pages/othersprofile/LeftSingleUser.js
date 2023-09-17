import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import AllContext from "../../contexts/AllContext";
import BlogContext from "../../contexts/BlogContext";

function LeftSingleUser() {
  const params = useParams();
  const { uri, user, setAccesstoken, logOut } = useContext(AllContext);
  const { users } = useContext(BlogContext);
  const navigate = useNavigate();

  const singleUser = users.filter((user) => user?._id === params.id);

  const handleDeleteAccount = () => {
    fetch(`${uri}/deleteuser`, {
      method: "POST",
      credentials: "include",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ _id: singleUser?._id }),
    }).then(() => {
      setAccesstoken(null);
    });
  };
  const handleLogout = () => {
    logOut();
  };
  return (
    <div className="profile-left">
      <section>
        <h2>Intro</h2>
        <article>
          {singleUser?.length ? (
            singleUser[0]?.bio
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
            {!singleUser?.length ? (
              "add an institution!"
            ) : (
              <p>
                studied at :
                <b>{!singleUser ? <Skeleton /> : singleUser[0]?.school}</b>
              </p>
            )}
          </li>
          <li>
            {!singleUser?.length ? (
              "add your job!"
            ) : (
              <p>
                works at :{" "}
                <b> {!singleUser ? <Skeleton /> : singleUser[0]?.job}</b>{" "}
              </p>
            )}
          </li>
          <li>
            {!singleUser?.length ? (
              "add your city!"
            ) : (
              <p>
                live at :
                <b> {!singleUser ? <Skeleton /> : singleUser[0]?.city} </b>
              </p>
            )}
          </li>
          <li>
            {!singleUser?.length ? (
              "add your state!"
            ) : (
              <p>
                from :{" "}
                <b>
                  {!singleUser?.length ? <Skeleton /> : singleUser[0]?.state}{" "}
                </b>
              </p>
            )}
          </li>
        </ul>
        {user?._id === singleUser[0]?._id && (
          <>
            <button onClick={() => navigate(`../editprofile/${params.id}`)}>
              Edit Details
            </button>
            <button onClick={handleLogout}>
              <span>log out</span>
            </button>
            <button onClick={handleDeleteAccount}>
              <span>close this accout</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LeftSingleUser;

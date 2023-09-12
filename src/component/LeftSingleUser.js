import React from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { logout, setAccesstoken } from "../redux/slice/AuthSlice";
import { useSelector } from "react-redux";
import { setUser } from "../redux/slice/BlogSlice";

function LeftSingleUser() {
  const params = useParams();
  const { uri } = useSelector((state) => state.AuthSlice);
  const { users, user } = useSelector((state) => state.BlogSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const singleUser = users.filter((user) => user?._id === params.id);

  const handleDeleteAccount = () => {
    fetch(`${uri}/deleteuser`, {
      method: "POST",
      credentials: "include",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ _id: singleUser?._id }),
    }).then(() => {
      dispatch(setAccesstoken(null));
    });
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(setUser(null));
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

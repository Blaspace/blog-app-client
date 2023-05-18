import React, { useContext } from "react";
import { useNavigate } from "react-router";
import AllContext from "../contexts/AllContext";
import useLogout from "../hooks/useLogout";

function LeftSingleUser({ singleUser }) {
  const handleLogOut = useLogout();
  const { user, uri } = useContext(AllContext);
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    const accesstoken = localStorage.getItem("jwt");
    fetch(`${uri}/deleteuser`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ _id: singleUser._id }),
    }).then(() => {
      localStorage.clear("jwt");
      navigate("../../");
    });
  };
  return (
    <>
      {Object.keys(singleUser).length && (
        <div className="profile-left">
          <section>
            <h2>Intro</h2>
            <article>
              {singleUser && singleUser.bio !== undefined ? (
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
                {singleUser && singleUser.school === undefined ? (
                  "add an institution!"
                ) : (
                  <p>
                    studied at :<b> {singleUser.school} </b>
                  </p>
                )}
              </li>
              <li>
                {singleUser && singleUser.job === undefined ? (
                  "add your job!"
                ) : (
                  <p>
                    works at : <b> {singleUser.job}</b>{" "}
                  </p>
                )}
              </li>
              <li>
                {singleUser && singleUser.city === undefined ? (
                  "add your city!"
                ) : (
                  <p>
                    live at :<b> {singleUser.city} </b>
                  </p>
                )}
              </li>
              <li>
                {singleUser && singleUser.state === undefined ? (
                  "add your state!"
                ) : (
                  <p>
                    from : <b>{singleUser.state} </b>
                  </p>
                )}
              </li>
            </ul>
            {singleUser && user._id === singleUser._id && (
              <>
                <button
                  onClick={() => navigate(`../editprofile/${singleUser._id}`)}
                >
                  Edit Details
                </button>
                <button onClick={handleLogOut}>
                  <span>log out</span>
                </button>
                <button onClick={handleDeleteAccount}>
                  <span>close this accout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default LeftSingleUser;

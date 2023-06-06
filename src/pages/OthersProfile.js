import ProfileUI from "../component/ProfileUl";
import React, { useState, useEffect, useContext } from "react";
import Newblog from "../component/Newblog";
import AllBlog from "../component/AllBlog";
import LeftSingleUser from "../component/LeftSingleUser";
import SingleUserHeading from "../component/SingleUserHeading";
import { useParams } from "react-router";
import AllContext from "../contexts/AllContext";
import Popup from "../component/Popup";

function Home() {
  const params = useParams();
  const [singleUser, setSingleUser] = useState({});
  const [errorMesage, setErrorMessage] = useState(null);
  const [blog, setBlog] = useState([]);
  const [users, setUsers] = useState([]);
  const { uri, setLoading, accesstoken, refresh } = useContext(AllContext);

  useEffect(() => {
    setLoading(true);
    fetch(`${uri}/singleuser/${params.id}`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => res.json())
      .then((data) => setSingleUser(data))
      .catch((err) => setErrorMessage("something went wrong!"))
      .finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    fetch(`${uri}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 403) {
          return refresh();
        }
      })
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${uri}/blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 403) {
          return refresh();
        }
      })
      .then((data) => setBlog(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="profile">
        <SingleUserHeading
          singleUser={singleUser}
          setSingleUser={setSingleUser}
        />
        <ProfileUI />
        <section className="profile-body">
          <div className="left-profile-con">
            <LeftSingleUser singleUser={singleUser} />
          </div>

          {/*main area*/}

          <div className="profile-main">
            <Newblog />
            <AllBlog blog={blog} users={users} />
          </div>
        </section>
        <Popup errorMesage={errorMesage} setErrorMessage={setErrorMessage} />
      </div>
    </>
  );
}

export default Home;

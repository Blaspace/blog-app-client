import ProfileUI from "../component/ProfileUl";
import React, { useState, useEffect, useContext } from "react";
import Newblog from "../component/Newblog";
import AllBlog from "../component/AllBlog";
import LeftSingleUser from "../component/LeftSingleUser";
import SingleUserHeading from "../component/SingleUserHeading";
import { useParams } from "react-router";
import AllContext from "../contexts/AllContext";
import Loading from "../component/Loading";
import Popup from "../component/Popup";

function Home() {
  const params = useParams();
  const [singleUser, setSingleUser] = useState({});
  const { uri, setLoading, loading, errorMessage, setErrorMessage } =
    useContext(AllContext);
  useEffect(() => {
    setLoading(true);
    fetch(`${uri}/singleuser/${params.id}`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setSingleUser(data);
        //console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage("something went wrong!");
      });
  }, [params]);

  return (
    <div className="profile">
      <SingleUserHeading
        singleUser={singleUser}
        setSingleUser={setSingleUser}
      />
      <ProfileUI />
      <section className="profile-body">
        <div className="left-profile-con">
          */
          <LeftSingleUser singleUser={singleUser} />
        </div>

        {/*main area*/}

        <div className="profile-main">
          <Newblog />
          <AllBlog />
        </div>
      </section>
      {loading && <Loading />}
      {errorMessage && <Popup />}
    </div>
  );
}

export default Home;

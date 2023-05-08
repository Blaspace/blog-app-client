import ProfileUI from "../component/ProfileUl";
import React, { useState, useEffect, useContext } from "react";
import Newblog from "../component/Newblog";
import AllBlog from "../component/AllBlog";
import LeftSingleUser from "../component/LeftSingleUser";
import SingleUserHeading from "../component/SingleUserHeading";
import { useParams } from "react-router";
import AllContext from "../contexts/AllContext";

function Home() {
  const params = useParams();
  const [singleUser, setSingleUser] = useState({});
  const { uri } = useContext(AllContext);
  useEffect(() => {
    fetch(`${uri}/singleuser/${params.id}`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setSingleUser(data);
        //console.log(data);
      })
      .catch((err) => console.log(err));
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
    </div>
  );
}

export default Home;

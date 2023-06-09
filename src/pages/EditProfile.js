import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import AllContext from "../contexts/AllContext";
import BlogContext from "../contexts/BlogContext";
import Popup from "../component/Popup";

function EditProfile() {
  const navigate = useNavigate();
  const { uri } = useContext(AllContext);
  const { users } = useContext(BlogContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const params = useParams();
  const bioRef = useRef();
  const stateRef = useRef();
  const jobRef = useRef();
  const cityRef = useRef();
  const schoolRef = useRef();
  const [bio, setBio] = useState();
  const [state, setState] = useState();
  const [job, setJob] = useState();
  const [city, setCity] = useState();
  const [school, setSchool] = useState();

  useEffect(() => {
    const newuser = users?.filter((value) => {
      return value?._id === params.id;
    });
    setBio(newuser[0]?.bio);
    setState(newuser[0]?.state);
    setJob(newuser[0]?.job);
    setCity(newuser[0]?.city);
    setSchool(newuser[0]?.school);
  }, [users]);

  const handleSubmit = () => {
    const obj = {
      bio,
      state,
      job,
      city,
      school,
    };

    fetch(`${uri}/editprofile/${params.id}`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(obj),
    }).then((res) => {
      if (res.ok) {
        navigate(`../profile/${params.id}`);
      } else {
        setErrorMessage("Error, please try again");
      }
    });
  };

  return (
    <div className="EditProfile">
      <br />
      <form onSubmit={(e) => e.preventDefault()}>
        <span>
          <label htmlFor="bio">bio</label>
          <input
            type="text"
            placeholder="bio"
            onChange={(e) => setBio(e.target.value)}
            ref={bioRef}
            value={bio}
          />
        </span>
        <span>
          <label htmlFor="state">state</label>
          <input
            type="text"
            placeholder="state"
            onChange={(e) => setState(e.target.value)}
            ref={stateRef}
            value={state}
          />
        </span>
        <span>
          <label htmlFor="job">job</label>
          <input
            type="text"
            placeholder="job"
            onChange={(e) => setJob(e.target.value)}
            ref={jobRef}
            value={job}
          />
        </span>
        <span>
          <label htmlFor="city">hometown</label>
          <input
            type="text"
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
            ref={cityRef}
            value={city}
          />
        </span>
        <span>
          <label htmlFor="school">school</label>
          <input
            type="text"
            placeholder="school"
            onChange={(e) => setSchool(e.target.value)}
            ref={schoolRef}
            value={school}
          />
        </span>
        <div>
          <button onClick={handleSubmit}>Update</button>
          <button onClick={() => navigate(`../profile/${params.id}`)}>
            cancil
          </button>
        </div>
      </form>
      <Popup errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
}

export default EditProfile;

import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AllContext from "../contexts/AllContext";

function EditProfile() {
  const navigate = useNavigate();
  const { uri, accesstoken } = useContext(AllContext);
  const [user, setUser] = useState();
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
    fetch(`${uri}/singleuser/${params.id}`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => res.json())
      .then((data) => {
        bioRef.current.value = data.bio ? data.bio : "";
        stateRef.current.value = data.state ? data.state : "";
        jobRef.current.value = data.job ? data.job : "";
        cityRef.current.value = data.city ? data.city : "";
        schoolRef.current.value = data.school ? data.school : "";
        setUser(data);
        console.log(data);
      })
      .catch((err) =>
        setErrorMessage("something went wrong, please try again!")
      );
  }, []);

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
    }).then(() => {
      navigate(`../profile/${user._id}`);
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
          />
        </span>
        <span>
          <label htmlFor="state">state</label>
          <input
            type="text"
            placeholder="state"
            onChange={(e) => setState(e.target.value)}
            ref={stateRef}
          />
        </span>
        <span>
          <label htmlFor="job">job</label>
          <input
            type="text"
            placeholder="job"
            onChange={(e) => setJob(e.target.value)}
            ref={jobRef}
          />
        </span>
        <span>
          <label htmlFor="city">hometown</label>
          <input
            type="text"
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
            ref={cityRef}
          />
        </span>
        <span>
          <label htmlFor="school">school</label>
          <input
            type="text"
            placeholder="school"
            onChange={(e) => setSchool(e.target.value)}
            ref={schoolRef}
          />
        </span>
        <div>
          <button onClick={handleSubmit}>Update</button>
          <button onClick={() => navigate(`../profile/${params.id}`)}>
            cancil
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;

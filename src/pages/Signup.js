import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AllContext from "../contexts/AllContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { uri } = useContext(AllContext);

  useEffect(() => {
    const accesstoken = localStorage.getItem("jwt");

    fetch(`${uri}/verify`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => {
        if (res.ok) {
          return navigate("/blog");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleSignup = async () => {
    const newObj = { username, email, password, job, state, city, school };

    await fetch(`${uri}/register`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(newObj),
    })
      .then((res) => {
        if (res.ok) {
          navigate("../");
        } else {
          console.log("error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-con">
      <div className="login">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="userName">user name:</label>
          <br />
          <input
            type="text"
            id="userName"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="user name"
          />
          <br></br>
          <label htmlFor="email">email:</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <br></br>
          <label htmlFor="pasword">pasword:</label>
          <br />
          <input
            type="pasword"
            id="pasword"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <br></br>
          <label htmlFor="state">state of origin:</label>
          <br />
          <input
            type="text"
            id="state"
            onChange={(e) => setState(e.target.value)}
            placeholder="state of origin"
          />
          <br />
          <label htmlFor="job">occupation:</label>
          <br />
          <input
            type="text"
            id="job"
            onChange={(e) => setJob(e.target.value)}
            placeholder="occupation"
          />
          <br />
          <label htmlFor="city">City:</label>
          <br />
          <input
            type="text"
            id="city"
            onChange={(e) => setCity(e.target.value)}
            placeholder="your city"
          />
          <br />
          <label htmlFor="school">School:</label>
          <br />
          <input
            type="text"
            id="school"
            onChange={(e) => setSchool(e.target.value)}
            placeholder="school"
          />
          <br />
          <button onClick={() => handleSignup()}>Signup</button>
        </form>
        <br />
        <div>
          <h3>
            already have an account <NavLink to={"/"}>Login</NavLink>
          </h3>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Signup;

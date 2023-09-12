import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../component/Loading";
import Popup from "../component/Popup";
import AllContext from "../contexts/AllContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const { uri } = useContext(AllContext);

  const handleSignup = async () => {
    setLoading(true);
    const newObj = { username, email, password, state, city };

    await fetch(`${uri}/register`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(newObj),
    })
      .then((res) => {
        if (res.ok) {
          setLoading(false);
          navigate("../");
        } else if (res.status === 409) {
          setLoading(false);
          throw new Error("this email has already been used");
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
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
            name="userName"
          />
          <br />
          <label htmlFor="email">email:</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            name="email"
          />
          <br />
          <label htmlFor="pasword">pasword:</label>
          <br />
          <input
            type="pasword"
            id="pasword"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            name="password"
          />
          <br />
          <label htmlFor="state">state of origin:</label>
          <br />
          <input
            type="text"
            id="state"
            onChange={(e) => setState(e.target.value)}
            placeholder="state of origin"
            name="state"
          />
          <br />
          <label htmlFor="city">City:</label>
          <br />
          <input
            type="text"
            id="city"
            onChange={(e) => setCity(e.target.value)}
            placeholder="your city"
            name="city"
          />
          <br />
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
      {loading && <Loading />}
      <Popup errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
}

export default Signup;

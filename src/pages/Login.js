import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AllContext from "../contexts/AllContext";
import verify from "../hooks/verify";

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AllContext);
  const navigate = useNavigate();

  const handleVerify = verify();

  useEffect(() => {
    const accesstoken = localStorage.getItem("jwt");
    fetch(`http://localhost:3500/verify`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    }).then((res) => {
      if (res.ok) {
        navigate("./blog");
      } else {
        navigate("./");
      }
    });
  }, []);

  const handleSubmit = () => {
    fetch(`http://localhost:3500/login`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error("Wrong email or password");
        } else {
          throw new Error("Email and password required");
        }
      })
      .then((data) => {
        localStorage.setItem("jwt", data.accesstoken);
        navigate("/blog");
        fetch("http://localhost:3500/get", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({ accesstoken: data.accesstoken }),
        })
          .then((res) => res.json())
          .then((data) => setUser(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="login-con">
      <div className="login">
        <h4 className="err">{error}</h4>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email">user email:</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <br />
          <br />
          <label htmlFor="password">password:</label>
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <br />
          <br />
          <button onClick={() => handleSubmit()}>Login</button>
        </form>
        <br />
        <div>
          <h3>
            don't have an account <NavLink to="../signup">sign up</NavLink>
          </h3>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Login;
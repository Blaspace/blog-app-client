import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AllContext from "../contexts/AllContext";
import Loading from "../component/Loading";
import { CgProfile } from "react-icons/cg";

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const { setAccesstoken, uri, loading, setLoading } = useContext(AllContext);

  const handleSubmit = () => {
    setLoading(true);
    fetch(`${uri}/login`, {
      method: "POST",
      credentials: "include",
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
      .then((data) => setAccesstoken(data.accesstoken))
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="login-con">
      <div className="login">
        <CgProfile
          style={{
            fontSize: "100px",
            background: "black",
            color: "white",
            borderRadius: "50%",
          }}
        />
        <h4 className="err">{error}</h4>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email">user email:</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            name="email"
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
            name="password"
          />
          <br />
          <br />
          <p style={{ fontSize: "16px", fontWeight: "lighter" }}>
            password: demo1234, email: demo@gmail.com
          </p>
          <br />
          <span>
            <button onClick={() => handleSubmit()}>Login</button>
          </span>
        </form>
        <br />
        <div>
          <h3>
            don't have an account <NavLink to="../signup">sign up</NavLink>
          </h3>
        </div>
        <br />
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default Login;

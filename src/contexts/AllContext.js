import { createContext, useEffect, useState } from "react";
import React from "react";

const AllContext = createContext();

export function ContextProvider({ children }) {
  const [blog, setBlog] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const uri = "https://blog-app-ux9e.onrender.com";

  useEffect(() => {
    const accesstoken = localStorage.getItem("jwt");
    fetch(`${uri}/get`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`${uri}/users`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${uri}/blog`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, []);

  return (
    <AllContext.Provider value={{ blog, setBlog, user, users, setUser, uri }}>
      {children}
    </AllContext.Provider>
  );
}

export default AllContext;

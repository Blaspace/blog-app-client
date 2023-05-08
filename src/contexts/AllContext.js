import { createContext, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router";

const AllContext = createContext();

export function ContextProvider({ children }) {
  const [blog, setBlog] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accesstoken = localStorage.getItem("jwt");
    fetch("http://localhost:3500/get", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => navigate("../"));
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:3500/users", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3500/blog", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, []);

  return (
    <AllContext.Provider value={{ blog, setBlog, user, users, setUser }}>
      {children}
    </AllContext.Provider>
  );
}

export default AllContext;

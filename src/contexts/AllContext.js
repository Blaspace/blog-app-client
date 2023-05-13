import { createContext, useEffect, useState } from "react";
import React from "react";

const AllContext = createContext();

export function ContextProvider({ children }) {
  const [blog, setBlog] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const uri = "https://blog-app-ux9e.onrender.com";
  //const uri = "http://localhost:3500";

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
        setLoading(false);
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
    setLoading(true);
    fetch(`${uri}/blog`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      });
  }, []);

  return (
    <AllContext.Provider
      value={{
        blog,
        setBlog,
        user,
        users,
        setUser,
        uri,
        loading,
        setLoading,
      }}
    >
      {children}
    </AllContext.Provider>
  );
}

export default AllContext;

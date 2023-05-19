import { createContext, useEffect, useState } from "react";
import React from "react";

const AllContext = createContext();

export function ContextProvider({ children }) {
  const [blog, setBlog] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [accesstoken, setAccesstoken] = useState("");

  const uri = "https://blog-app-ux9e.onrender.com";
  //const uri = "http://localhost:3500";

  const logOut = () => {
    fetch(`${uri}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accesstoken }),
    }).then(() => setAccesstoken(""));
  };

  const refresh = () => {
    fetch(`${uri}/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          logOut();
        }
      })
      .then((data) => setAccesstoken(data.accesstoken));
  };

  useEffect(() => {
    fetch(`${uri}/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          logOut();
        }
      })
      .then((data) => setAccesstoken(data.accesstoken));
  }, []);

  useEffect(() => {
    fetch(`${uri}/get`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 403) {
          refresh();
        }
      })
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, [accesstoken]);

  setTimeout(() => {
    fetch(`${uri}/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          logOut();
        }
      })
      .then((data) => setAccesstoken(data.accesstoken));
  }, 1000 * 60 * 14);

  return (
    <AllContext.Provider
      value={{
        blog,
        setBlog,
        user,
        setUser,
        uri,
        loading,
        setLoading,
        accesstoken,
        setAccesstoken,
        logOut,
        refresh,
      }}
    >
      {children}
    </AllContext.Provider>
  );
}

export default AllContext;

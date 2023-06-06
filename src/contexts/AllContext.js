import { createContext, useEffect, useState } from "react";
import React from "react";

const AllContext = createContext();

export function ContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [accesstoken, setAccesstoken] = useState(null);

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

  useEffect(() => {
    if (accesstoken) {
      fetch(`${uri}/get`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
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
        .catch((err) => console.log(err));
    }
  }, [accesstoken]);

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

  setTimeout(() => accesstoken && refresh(), 1000 * 60 * 60);

  return (
    <AllContext.Provider
      value={{
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

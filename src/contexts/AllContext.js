import { createContext, useEffect, useState } from "react";
import React from "react";

const AllContext = createContext();

export function ContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [accesstoken, setAccesstoken] = useState(null);

  const uri = "https://blogserver-n5ws.onrender.com";
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
    if (accesstoken) {
      fetch(`${uri}/get`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
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

  return (
    <AllContext.Provider
      value={{
        user,
        setUser,
        uri,
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

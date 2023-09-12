import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";
import AllContext from "../contexts/AllContext";

function PersistentLogin() {
  const { uri, accesstoken, logOut, setAccesstoken } = useContext(AllContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const persistentlogin = () => {
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
        .then((data) => setAccesstoken(data.accesstoken))
        .finally(() => setLoading(false));
    };

    !accesstoken ? persistentlogin() : setLoading(false);
  }, []);
  return <>{loading ? <Loading /> : <Outlet />}</>;
}

export default PersistentLogin;

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";
import { logout, setAccesstoken } from "../redux/slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

function PersistentLogin() {
  const { uri, accesstoken } = useSelector((state) => state.AuthSlice);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
            dispatch(logout());
          }
        })
        .then((data) => dispatch(setAccesstoken(data.accesstoken)))
        .finally(() => setLoading(false));
    };

    !accesstoken ? persistentlogin() : setLoading(false);
  }, []);
  return <>{loading ? <Loading /> : <Outlet />}</>;
}

export default PersistentLogin;

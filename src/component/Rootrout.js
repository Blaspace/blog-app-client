import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";

function Rootrout() {
  const { accesstoken } = useSelector((state) => state.AuthSlice);
  return (
    <div>
      {accesstoken ? (
        <>
          <Nav />
          <Outlet />
        </>
      ) : (
        <Navigate to="/" replace />
      )}
    </div>
  );
}

export default Rootrout;

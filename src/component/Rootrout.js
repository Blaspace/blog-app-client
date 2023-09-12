import { Outlet, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import Nav from "./Nav";
import AllContext from "../contexts/AllContext";

function Rootrout() {
  const { accesstoken } = useContext(AllContext);
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

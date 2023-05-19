import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AllContext from "../contexts/AllContext";

function Publicrout() {
  const { accesstoken } = useContext(AllContext);
  return (
    <div>{!accesstoken ? <Outlet /> : <Navigate to="/blog" replace />}</div>
  );
}

export default Publicrout;

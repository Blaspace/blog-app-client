import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Publicrout() {
  const { accesstoken } = useSelector((state) => state.AuthSlice);
  return (
    <div>{!accesstoken ? <Outlet /> : <Navigate to="/blog" replace />}</div>
  );
}

export default Publicrout;

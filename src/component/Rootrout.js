import { Outlet } from "react-router-dom";
import React from "react";
import Nav from "./Nav";

function Rootrout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default Rootrout;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Rootrout from "./component/Rootrout";
import Signup from "./pages/Signup";
import OthersProfile from "./pages/OthersProfile";
import SinglBlog from "./pages/SinglBlog";
import Friends from "./pages/Friends";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Rootrout />}>
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile/:id" element={<OthersProfile />} />
          <Route path="/singleblog/:id" element={<SinglBlog />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/editprofile/:id" element={<EditProfile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<h1>404 page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/blog/Blog";
import Rootrout from "./component/Rootrout";
import Signup from "./pages/Signup";
import OthersProfile from "./pages/othersprofile/OthersProfile";
import SinglBlog from "./pages/singleblog/SinglBlog";
import Friends from "./pages/friends/Friends";
import EditProfile from "./pages/EditProfile";
import Publicrout from "./component/Publicrout";
import PersistentLogin from "./component/PersistentLogin";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Publicrout />}>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PersistentLogin />}>
          <Route path="/" element={<Rootrout />}>
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile/:id" element={<OthersProfile />} />
            <Route path="/singleblog/:id" element={<SinglBlog />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/editprofile/:id" element={<EditProfile />} />
          </Route>
        </Route>

        <Route path="/*" element={<h1>404 page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;

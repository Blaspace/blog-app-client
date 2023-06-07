import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Rootrout from "./component/Rootrout";
import Signup from "./pages/Signup";
import OthersProfile from "./pages/OthersProfile";
import SinglBlog from "./pages/SinglBlog";
import Friends from "./pages/Friends";
import EditProfile from "./pages/EditProfile";
import Publicrout from "./component/Publicrout";
import PersistentLogin from "./component/PersistentLogin";
import BlogsProvider from "./component/BlogProvider";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Publicrout />}>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PersistentLogin />}>
          <Route element={<BlogsProvider />}>
            <Route path="/" element={<Rootrout />}>
              <Route path="/blog" element={<Blog />} />
              <Route path="/profile/:id" element={<OthersProfile />} />
              <Route path="/singleblog/:id" element={<SinglBlog />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/editprofile/:id" element={<EditProfile />} />
            </Route>
          </Route>
        </Route>

        <Route path="/*" element={<h1>404 page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;

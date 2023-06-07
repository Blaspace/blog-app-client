import React from "react";
import { Outlet } from "react-router";
import { BlogProvider } from "../contexts/BlogContext";

function BlogsProvider() {
  return (
    <BlogProvider>
      <Outlet />
    </BlogProvider>
  );
}

export default BlogsProvider;

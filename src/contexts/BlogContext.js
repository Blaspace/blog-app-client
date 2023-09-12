import React, { createContext, useState, useEffect, useContext } from "react";
import AllContext from "./AllContext";

const BlogContext = createContext();
export function BlogProvider({ children }) {
  const [blog, setBlog] = useState(null);
  const [users, setUsers] = useState([]);
  const [like, setLike] = useState([]);
  const [comment, setComment] = useState([]);
  const { uri, accesstoken, refresh } = useContext(AllContext);

  useEffect(() => {
    if (!users) {
      fetch(`${uri}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accesstoken }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 403) {
            return refresh();
          }
        })
        .then((data) => setUsers(data));
    }
  }, [users]);

  return (
    <BlogContext.Provider
      value={{
        blog: blog?.reverse(),
        setBlog,
        users,
        setUsers,
        like,
        setLike,
        comment,
        setComment,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export default BlogContext;

import React, { createContext, useState, useContext, useEffect } from "react";
import AllContext from "./AllContext";

const BlogContext = createContext();
export function BlogProvider({ children }) {
  const [blog, setBlog] = useState(null);
  const [users, setUsers] = useState([]);
  const { uri, accesstoken, setLoading, refresh } = useContext(AllContext);

  useEffect(() => {
    if (accesstoken) {
      setLoading(true);
      fetch(`${uri}/blog`, {
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
        .then((data) => setBlog(data))
        .finally(() => setLoading(false));
    }
  }, [accesstoken]);

  useEffect(() => {
    if (accesstoken) {
      setLoading(true);
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
        .then((data) => setUsers(data))
        .finally(() => setLoading(false));
    }
  }, [accesstoken]);

  return (
    <BlogContext.Provider value={{ blog, setBlog, users, setUsers }}>
      {children}
    </BlogContext.Provider>
  );
}

export default BlogContext;

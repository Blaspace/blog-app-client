import { useContext } from "react";
import AllContext from "../contexts/AllContext";

function useFetchBlog() {
  const { setBlog, uri } = useContext(AllContext);
  const getBlog = () => {
    fetch(`${uri}/blog`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setBlog(data));
  };

  return getBlog;
}

export default useFetchBlog;

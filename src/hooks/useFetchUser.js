import { useContext } from "react";
import AllContext from "../contexts/AllContext";

function useFetchUser() {
  const { setUser } = useContext(AllContext);
  const handleGetUser = () => {
    const accesstoken = localStorage.getItem("jwt");
    fetch("http://localhost:3500/get", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  return handleGetUser;
}

export default useFetchUser;

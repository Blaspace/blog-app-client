import { useContext } from "react";
import AllContext from "../contexts/AllContext";

function useFetchSingleUser() {
  const { uri } = useContext(AllContext);
  const handleFetchUser = (userId, db) => {
    fetch(`${uri}/singleuser/${userId}`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => db(data));
  };
  return handleFetchUser;
}

export default useFetchSingleUser;

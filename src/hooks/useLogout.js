import { useContext } from "react";
import { useNavigate } from "react-router";
import AllContext from "../contexts/AllContext";

function useLogout() {
  const navigate = useNavigate();
  const { uri } = useContext(AllContext);
  const handleLogout = () => {
    const accesstoken = localStorage.getItem("jwt");

    fetch(`${uri}/logout`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    }).then((res) => {
      if (res.ok) {
        localStorage.clear();
        navigate("/");
      }
    });
  };
  return handleLogout;
}

export default useLogout;

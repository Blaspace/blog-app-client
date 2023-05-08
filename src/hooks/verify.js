import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AllContext from "../contexts/AllContext";

function Verify() {
  const navigate = useNavigate();
  const { uri } = useContext(AllContext);
  const handleVerify = () => {
    const accesstoken = localStorage.getItem("jwt");
    if (!accesstoken) return navigate("../");

    fetch(`${uri}/verify`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ accesstoken }),
    }).then((res) => {
      if (res.ok) {
        return;
      } else {
        return navigate("../");
      }
    });
  };

  return handleVerify;
}

export default Verify;

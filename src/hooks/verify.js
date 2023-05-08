import { useNavigate } from "react-router-dom";

function Verify() {
  const navigate = useNavigate();
  const handleVerify = () => {
    const accesstoken = localStorage.getItem("jwt");
    if (!accesstoken) return navigate("../");

    fetch("http://localhost:3500/verify", {
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

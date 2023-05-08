import { useNavigate } from "react-router";

function useLogout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const accesstoken = localStorage.getItem("jwt");

    fetch("http://localhost:3500/logout", {
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

import React, { useContext } from "react";
import AllContext from "../contexts/AllContext";

function Popup({ errorMessage }) {
  const { setErrorMessage } = useContext(AllContext);
  return (
    <div className="popup-con">
      <div className="popup">
        <h4>{errorMessage}</h4>
        <br />
        <button onClick={() => setErrorMessage(null)}>Okay</button>
      </div>
    </div>
  );
}

export default Popup;

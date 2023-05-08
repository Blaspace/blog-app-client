import React from "react";

function Popup({ errorMessage, setErrorMessage }) {
  return (
    <div className="popup-con">
      <div className="popup">
        <h4>{errorMessage}</h4>
        <br />
        <button onClick={() => setErrorMessage("")}>Okay</button>
      </div>
    </div>
  );
}

export default Popup;

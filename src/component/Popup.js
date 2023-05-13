import React from "react";

function Popup({ errorMessage, setErrorMessage }) {
  return (
    <>
      {errorMessage && (
        <div className="popup-con">
          <div className="popup">
            <h4>{errorMessage}</h4>
            <br />
            <button onClick={() => setErrorMessage(null)}>Okay</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;

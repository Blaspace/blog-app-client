import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/AllContext";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./component/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ContextProvider>
          <App />
        </ContextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);

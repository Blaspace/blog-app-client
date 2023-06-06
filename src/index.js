import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/AllContext";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import ErrorBoundary from "./component/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#ecf3ff" highlightColor="#cfd1d5">
      <BrowserRouter>
        <ErrorBoundary>
          <ContextProvider>
            <App />
          </ContextProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </SkeletonTheme>
  </React.StrictMode>
);

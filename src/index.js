import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import ErrorBoundary from "./component/ErrorBoundary";
import { ContextProvider } from "./contexts/AllContext";
import { BlogProvider } from "./contexts/BlogContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#ecf3ff" highlightColor="#cfd1d5">
      <BrowserRouter>
        <ErrorBoundary>
          <ContextProvider>
            <BlogProvider>
              <App />
            </BlogProvider>
          </ContextProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </SkeletonTheme>
  </React.StrictMode>
);

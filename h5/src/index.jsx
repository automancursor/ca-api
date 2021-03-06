import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// 区分host
if (process.env.NODE_ENV === "development") {
  process.env.HOST = process.env.REACT_APP_DEV_HOST;
} else {
  process.env.HOST = process.env.REACT_APP_PROD_HOST;
}
document.documentElement.style.setProperty("--theme-primary", "#264c8f");
ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TodoContextProvier from "./context/TodoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TodoContextProvier>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TodoContextProvier>
);

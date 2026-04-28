import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./features/app/app";

const root = document.getElementById("root");

if (!root) {
  console.error("Unable to render app to DOM");
} else {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

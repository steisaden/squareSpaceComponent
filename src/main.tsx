
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadSquarespaceConfig } from "./config";

const container =
  document.querySelector<HTMLElement>("[data-venue-square-root]")
  || document.getElementById("interactive-venue-square")
  || document.getElementById("root");

if (!container) {
  throw new Error("InteractiveVenueSquareElement: No root element found to mount into.");
}

const config = loadSquarespaceConfig(container);

createRoot(container).render(<App config={config} />);
  

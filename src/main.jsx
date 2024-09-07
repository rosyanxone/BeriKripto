import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";

import { StateContextProvider } from "./context/index.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThirdwebProvider>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </ThirdwebProvider>
    </BrowserRouter>
  </StrictMode>,
);

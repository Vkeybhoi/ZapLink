import { StrictMode } from "react";
   import { createRoot } from "react-dom/client";
   import App from "./App";
   import "./index.css";
   import "primereact/resources/themes/lara-light-indigo/theme.css";
   import "primeicons/primeicons.css";
   import { ToastContainer } from "react-toastify";
   import "react-toastify/dist/ReactToastify.css";

   createRoot(document.getElementById("root")!).render(
     <StrictMode>
       <App />
       <ToastContainer position="top-right" autoClose={3000} />
     </StrictMode>
   );
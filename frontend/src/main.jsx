import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/index.css";
import { ThemeProvider } from "../context/ThemeContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);

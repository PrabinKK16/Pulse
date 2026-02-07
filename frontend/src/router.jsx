import { createBrowserRouter } from "react-router-dom";
import Appshell from "./components/layout/Appshell";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Appshell />,
    children: [{ index: true, element: <Dashboard /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

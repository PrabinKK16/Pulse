import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css';
import App from './App.jsx'
import { ThemeProvider } from '../context/ThemeContext.jsx'
import { RouterProvider } from 'react-router-dom';
import {router} from "./router.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);

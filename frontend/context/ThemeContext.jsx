import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const prefersTheme = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  const [theme, setTheme] = useLocalStorage("theme", prefersTheme ? "light" : "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>
    { children }
  </ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext);

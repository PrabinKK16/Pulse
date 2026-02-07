import React from 'react';
import { useTheme } from '../context/ThemeContext';

function App() {
  const { toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center"> 
      <button onClick={toggleTheme}
        className="px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--bg-muted)]">Toggle Theme</button>
    </div>
  )
}

export default App
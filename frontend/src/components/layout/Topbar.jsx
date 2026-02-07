import { useTheme } from "../../../context/ThemeContext";

export default function Topbar() {
  const { toggleTheme } = useTheme();

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-[var(--bg-muted)]">
      <div className="text-sm text-[var(--text-muted)]">
        Personal overview
      </div>

      <button
        onClick={toggleTheme}
        className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-muted)] hover:bg-[var(--bg-card)] transition"
      >
        Theme
      </button>
    </header>
  );
}

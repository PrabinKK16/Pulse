import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";

export default function Topbar() {
  const { toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-[var(--bg-muted)]">
      <div className="text-sm text-[var(--text-muted)]">Personal overview</div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-muted)] hover:bg-[var(--bg-card)] transition"
        >
          Theme
        </button>

        <button
          onClick={logout}
          className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-muted)] hover:bg-[var(--bg-card)] transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

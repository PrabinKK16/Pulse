import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-3 py-2 rounded-md text-sm transition ${
    isActive
      ? "bg-[var(--bg-muted)] text-[var(--text-main)]"
      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
  }`;

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[var(--bg-card)] border-r border-[var(--bg-muted)] px-5 py-6">
      <h1 className="heading text-2xl tracking-tight mb-10">Pulse</h1>

      <nav className="space-y-1">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/records" className={linkClass}>
          Records
        </NavLink>
      </nav>
    </aside>
  );
}

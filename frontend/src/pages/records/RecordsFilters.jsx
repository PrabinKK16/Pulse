import { useState } from "react";

export default function RecordsFilters({ onChange }) {
  const [type, setType] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setType(value);
    onChange(value);
  };

  return (
    <div className="mb-6 flex items-center gap-4">
      <label className="text-sm text-[var(--text-muted)]">
        Filter by type:
      </label>

      <select
        value={type}
        onChange={handleChange}
        className="rounded-lg bg-[var(--bg-muted)] px-3 py-2 text-sm outline-none"
      >
        <option value="">All</option>
        <option value="habit">Habit</option>
        <option value="expense">Expense</option>
        <option value="focus">Focus</option>
        <option value="note">Note</option>
      </select>
    </div>
  );
}
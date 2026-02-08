import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { apiFetch } from "../../lib/api";

function createRecordModal({ open, onClose, onCreated }) {
  const [type, setType] = useState("habit");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const record = await apiFetch("/records", {
        method: "POST",
        body: JSON.stringify({
          type,
          title,
          value: value === "" ? null : Number(value),
        }),
      });

      onCreated(record);
      onClose();

      setTitle("");
      setType("habit");
      setValue("");
    } catch (error) {
      setError(error.message || "Failed to create record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={opne} onClose={onClose}>
      <h3 className="text-sm font-medium mb-4">Create record</h3>

      <div className="space-y-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-lg bg-[var(--bg-muted)] px-3 py-2 text-sm outline-noe"
        >
          <option value="habit">Habit</option>
          <option value="expense">Expense</option>
          <option value="focus">Focus</option>
          <option value="note">Note</option>
        </select>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded-lg bg-[var(--bg-muted)] px-3 py-2 text-sm outline-none"
        />

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          className="w-full rounded-lg bg-[var(--bg-muted)] px-3 py-2 text-sm outline-none"
        />

        {error && (
          <div className="text-xs text-[var(--accent-danger)]">{error}</div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="text-sm text-[var(--text-muted)]"
          disabled={loading}
        >
          Cancel
        </button>

        <Button onClick={submit} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </div>
    </Modal>
  );
}

export default createRecordModal;

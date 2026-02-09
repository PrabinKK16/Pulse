import PageWrapper from "../../components/layout/PageWrapper";
import Button from "../../components/ui/Button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";
import CreateRecordModal from "../records/createRecordModal";
import EditRecordModal from "../records/EditRecordModal";

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [stats, setStats] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recordRes, statsRes] = await Promise.all([
          apiFetch("/records?limit=5"),
          apiFetch("/records/stats"),
        ]);

        setRecords(recordRes.data);
        setStats(statsRes);
      } catch (error) {
        console.error("Failed to load records:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/records/${id}`, {
        method: "DELETE",
      });

      setRecords((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Failed to delete record", error.message);
    }
  };

  return (
    <PageWrapper>
      <motion.section
        className="mt-16 space-y-7"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <h1 className="heading text-[2.75rem] leading-[1.1] max-w-xl">
          Your personal system,
          <br />
          quietly in control.
        </h1>

        <p className="text-[var(--text-muted)] max-w-lg text-sm leading-relaxed">
          Track patterns across money, focus, and habits — not as raw numbers,
          but as signals you can act on.
        </p>

        <div className="pt-4">
          <Button onClick={() => setOpenCreate(true)}>
            View today’s overview
            <span className="opacity-60 group-hover:translate-x-0.5 transition">
              →
            </span>
          </Button>
        </div>
      </motion.section>

      {!loading && stats.length === 0 && (
        <div className="mt-20 text-sm text-[var(--text-muted)]">
          No stats available yet.
        </div>
      )}

      {stats.length > 0 && (
        <section className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.type}
              className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--bg-muted)]"
            >
              <div className="text-xs text-[var(--text-muted)] capitalize">
                {s.type}
              </div>

              <div className="mt-2 text-xl font-medium">
                {s.type === "expense" ? s.totalValue : s.count}
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="mt-20 space-y-6">
        <h2 className="text-sm font-medium text-[var(--text-muted)]">
          Recent activity
        </h2>

        {loading && (
          <div className="text-sm text-[var(--text-muted)]">
            Loading activity...
          </div>
        )}

        {!loading && records.length === 0 && (
          <div className="text-sm text-[var(--text-muted)]">
            No activity yet. Start by adding your first record.
          </div>
        )}

        {!loading && records.length > 0 && (
          <div className="space-y-3">
            {records.map((record) => (
              <div
                key={record._id}
                className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--bg-muted)]"
              >
                <div className="flex items-center justify-between group">
                  <div>
                    <div className="text-sm font-medium">{record.title}</div>
                    <div className="text-xs text-[var(--text-muted)] capitalize">
                      {record.type}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {record.value !== null && (
                      <div className="text-sm font-medium">{record.value}</div>
                    )}

                    <button
                      onClick={() => setEditing(record)}
                      className="
                      text-xs text-[var(--text-muted)] opacity-0 group-hover:opacity-100 
                      hover:text-[var(--accent-primary)] transition
                      "
                      title="Delete"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(record._id)}
                      className="
                      text-xs text-[var(--text-muted)] opacity-0 group-hover:opacity-100 
                      hover:text-[var(--accent-danger)] transition
                      "
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <CreateRecordModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={(record) =>
          setRecords((prev) => [record, ...prev].slice(0, 5))
        }
      />

      <EditRecordModal
        open={Boolean(editing)}
        record={editing}
        onClose={() => setEditing(null)}
        onUpdated={(updated) =>
          setRecords((prev) =>
            prev.map((r) => (r._id === updated._id ? updated : r)),
          )
        }
      />
    </PageWrapper>
  );
}

import PageWrapper from "../../components/layout/PageWrapper";
import Button from "../../components/ui/Button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const res = await apiFetch("/records?limit=5");
        setRecords(res);
      } catch (error) {
        console.error("Failed to load records:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, []);

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
          <Button>
            View today’s overview
            <span className="opacity-60 group-hover:translate-x-0.5 transition">
              →
            </span>
          </Button>
        </div>
      </motion.section>

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
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{record.title}</div>
                    <div className="text-xs text-[var(--text-muted)] capitalize">
                      {record.type}
                    </div>
                  </div>

                  {record.value !== null && (
                    <div className="text-sm font-medium">{record.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}

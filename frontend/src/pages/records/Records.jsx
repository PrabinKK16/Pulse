import { useEffect, useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper";
import EditRecordModal from "./EditRecordModal";
import RecordsFilters from "./RecordsFilters";
import { apiFetch } from "../../lib/api";

export default function Records() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");

  const [editing, setEditing] = useState(null);

  const limit = 10;

  useEffect(() => {
    const loadRecords = async () => {
      setLoading(true);

      try {
        const query = `/records?page=${page}&limit=${limit}${
          typeFilter ? `&type=${typeFilter}` : ""
        }`;

        const res = await apiFetch(query);

        setRecords(res.data);
        setTotalPages(res.meta.totalPages);
      } catch (error) {
        console.error("Failed to load records:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, [page, typeFilter]);

  useEffect(() => {
    setPage(1);
  }, [typeFilter]);

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/records/${id}`, { method: "DELETE" });

      setRecords((prev) => {
        const updated = prev.filter((r) => r._id !== id);

        if (updated.length === 0 && page > 1) {
          setPage((p) => p - 1);
        }

        return updated;
      });
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  return (
    <PageWrapper>
      <h1 className="heading text-2xl mb-6">All Records</h1>

      <RecordsFilters onChange={setTypeFilter} />

      {loading && (
        <div className="text-sm text-[var(--text-muted)]">
          Loading records…
        </div>
      )}

      {!loading && records.length === 0 && (
        <div className="text-sm text-[var(--text-muted)]">
          No records found.
        </div>
      )}

      {!loading && records.length > 0 && (
        <>
          <div className="space-y-3">
            {records.map((record) => (
              <div
                key={record._id}
                className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--bg-muted)]"
              >
                <div className="flex items-center justify-between group">
                  <div>
                    <div className="text-sm font-medium">
                      {record.title}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] capitalize">
                      {record.type}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {record.value !== null && (
                      <div className="text-sm font-medium">
                        {record.value}
                      </div>
                    )}

                    <button
                      onClick={() => setEditing(record)}
                      className="text-xs text-[var(--text-muted)] opacity-0 group-hover:opacity-100 hover:text-[var(--accent-primary)] transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(record._id)}
                      className="text-xs text-[var(--text-muted)] opacity-0 group-hover:opacity-100 hover:text-[var(--accent-danger)] transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-sm">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-[var(--text-muted)] disabled:opacity-40"
            >
              ← Previous
            </button>

            <span className="text-[var(--text-muted)]">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={page >= totalPages}
              className="text-[var(--text-muted)] disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </>
      )}

      <EditRecordModal
        open={Boolean(editing)}
        record={editing}
        onClose={() => setEditing(null)}
        onUpdated={(updated) =>
          setRecords((prev) =>
            prev.map((r) => (r._id === updated._id ? updated : r))
          )
        }
      />
    </PageWrapper>
  );
}
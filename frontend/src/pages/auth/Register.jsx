import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { apiFetch } from "../../lib/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
      <form
        onSubmit={submit}
        className="w-full max-w-sm p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--bg-muted)]"
      >
        <h1 className="heading text-xl mb-6">Create your account</h1>

        <div className="space-y-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-[var(--bg-muted)] px-3 py-2 text-sm outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-[var(--bg-muted)] px-3 py-2 text-sm outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-[var(--bg-muted)] px-3 py-2 text-sm outline-none"
          />

          {error && (
            <div className="text-xs text-[var(--accent-danger)]">{error}</div>
          )}
        </div>

        <div className="mt-6">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating…" : "Create account"}
          </Button>
        </div>

        <p className="mt-4 text-xs text-[var(--text-muted)] text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--accent-primary)]">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

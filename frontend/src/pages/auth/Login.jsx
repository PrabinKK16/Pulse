import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      await refreshUser();
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
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
        <h1 className="heading text-xl mb-6">Welcome back</h1>

        <div className="space-y-4">
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
          <Button
            type="submit"
            disabled={loading}
            className="w-full text-center"
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </div>

        <p className="mt-4 text-xs text-[var(--text-muted)] text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[var(--accent-primary)]">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}

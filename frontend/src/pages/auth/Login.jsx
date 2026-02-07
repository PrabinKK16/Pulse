import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("https://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return;
    }

    const data = await res.json();
    setUser(data);
    navigate("/");
  };

  return <div>Login</div>;
}

export default Login;

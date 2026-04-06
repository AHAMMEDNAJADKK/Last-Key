import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use context

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);

      // ✅ USE CONTEXT (not localStorage directly)
      login({
        token: data.token,
        user: {
          role: data.role,
          email: data.email,
        },
      });

      navigate("/user/home");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="glass-card hover-card p-5">
            <h2 className="text-center mb-4">
              Login to <span className="gold">LastKey</span>
            </h2>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-gold w-100 mt-2">
                Login
              </button>
            </form>

            <p className="text-center mt-4 text-muted">
              Don't have an account?{" "}
              <Link to="/register" className="gold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
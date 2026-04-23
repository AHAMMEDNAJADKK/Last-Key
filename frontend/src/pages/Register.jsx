import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", form);

      login({
        token: data.token,
        user: {
          role: data.role,
          email: data.email,
        },
      });

      navigate("/user/home");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="glass-card hover-card p-5">
            <h2 className="text-center mb-4">
              Create Your <span className="gold">LastKey</span> Account
            </h2>

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                  onChange={handleChange}
                />
              </div>

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
                  placeholder="Create a password"
                  required
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-gold w-100 mt-2">
                Create Account
              </button>
            </form>

            <p className="text-center mt-4 text-muted">
              Already have an account?{" "}
              <Link to="/login" className="gold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
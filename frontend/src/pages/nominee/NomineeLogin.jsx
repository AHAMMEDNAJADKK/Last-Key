import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function NomineeLogin() {

  const navigate = useNavigate();
  const { login } = useAuth();

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
      const { data } = await API.post("/nominees/login", form);

      // ✅ REAL LOGIN
      login(data);

      navigate("/nominee/upload-death-certificate");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container py-5">

      <div className="text-center mb-4">
        <h2>
          Nominee <span className="gold">Access Login</span>
        </h2>

        <p className="text-muted mx-auto" style={{ maxWidth: 650 }}>
          Login securely to access vault after verification.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="glass-card hover-card p-4">

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter nominee email"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn btn-gold w-100 mt-2">
                Login Securely
              </button>

            </form>

          </div>

        </div>
      </div>

    </div>
  );
}
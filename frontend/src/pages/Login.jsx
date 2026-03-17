import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // COMMON LOGIN FLAG
    localStorage.setItem("isLoggedIn", "true");

    // ROLE LOGIC
    if (email.toLowerCase().includes("nominee")) {

      localStorage.setItem("role", "nominee");
      localStorage.setItem("deathVerified", "false");

      navigate("/nominee/upload-death-certificate");

    } else {

      localStorage.setItem("role", "user");

      navigate("/user/home");

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
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-gold w-100 mt-2"
              >
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
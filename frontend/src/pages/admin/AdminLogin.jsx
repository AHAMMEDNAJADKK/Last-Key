import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // FRONTEND DEMO LOGIN
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "admin");

    navigate("/admin/dashboard");
  };

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-4">

        <h2>
          Admin <span className="gold">Secure Login</span>
        </h2>

        <p className="text-muted mx-auto" style={{ maxWidth: 650 }}>
          Only authorized administrators can access the verification panel
          to review nominee requests and approve vault access.
        </p>

      </div>

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="glass-card hover-card p-4">

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label">
                  Admin Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter admin email"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="btn btn-gold w-100 mt-2"
              >
                Login as Admin
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}
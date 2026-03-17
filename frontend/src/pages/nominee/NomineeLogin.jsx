import { useNavigate } from "react-router-dom";

export default function NomineeLogin() {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // FRONTEND DEMO LOGIN
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "nominee");
    localStorage.setItem("deathVerified", "false");

    navigate("/nominee/upload-death-certificate");
  };

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-4">

        <h2>
          Nominee <span className="gold">Access Login</span>
        </h2>

        <p className="text-muted mx-auto" style={{ maxWidth: 650 }}>
          Nominees can securely access the digital vault once identity
          verification and document approval are completed.
        </p>

      </div>

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="glass-card hover-card p-4">

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="mb-3">

                <label className="form-label">
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter nominee email"
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
                Login Securely
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}
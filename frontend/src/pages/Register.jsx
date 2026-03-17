import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // frontend only
    navigate("/login");
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
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Create a password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-gold w-100 mt-2"
              >
                Create Account
              </button>

            </form>

            <p className="text-center mt-4 text-muted">
              Already have an account?{" "}
              <Link to="/login" className="gold">
                Login
              </Link>
            </p>

            <p className="text-center mt-3 text-muted small">
              Nominees can be added later from your secure vault.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
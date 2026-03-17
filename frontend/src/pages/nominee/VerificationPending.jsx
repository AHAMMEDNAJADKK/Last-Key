import { useNavigate } from "react-router-dom";

export default function VerificationPending() {

  const navigate = useNavigate();

  const approve = () => {
    // DEMO ADMIN APPROVAL
    localStorage.setItem("deathVerified", "true");

    navigate("/nominee/access");
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="glass-card hover-card p-5 text-center">

            {/* ICON */}
            <div className="card-icon mb-3">
              ⏳
            </div>

            <h3>
              Verification <span className="gold">Pending</span>
            </h3>

            <p className="text-muted mt-3">
              Your uploaded death certificate is currently under review.
              Our verification team will carefully validate the document
              before granting access to the digital vault.
            </p>

            <p className="text-muted small mt-2">
              This process helps ensure security and prevents
              unauthorized access to sensitive information.
            </p>

            {/* DEMO BUTTON */}
            <button
              className="btn btn-outline-warning mt-4"
              onClick={approve}
            >
              Demo: Approve Verification
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  // DEMO DATA
  const nomineeRequest = {
    nomineeName: "Rahul Kumar",
    userName: "Ahamed Najad",
    document: "death_certificate.pdf"
  };

  const approveAccess = () => {
    alert("Access Approved");
    navigate("/nominee/access");
  };

  const rejectAccess = () => {
    alert("Access Rejected");
  };

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="mb-5 text-center">

        <h2>
          Admin <span className="gold">Verification Panel</span>
        </h2>

        <p className="text-muted">
          Review nominee verification requests before granting vault access.
        </p>

      </div>

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="glass-card hover-card p-4">

            {/* ICON */}
            <div className="card-icon mb-3 text-center">
              📄
            </div>

            <h5 className="text-center mb-3">
              Death Certificate Verification
            </h5>

            <p className="mb-1">
              <strong>Nominee:</strong> {nomineeRequest.nomineeName}
            </p>

            <p className="mb-1">
              <strong>User Account:</strong> {nomineeRequest.userName}
            </p>

            <p className="mb-3">
              <strong>Document:</strong>{" "}
              <span className="text-info">
                {nomineeRequest.document}
              </span>
            </p>

            {/* ACTION BUTTONS */}
            <div className="d-flex gap-2">

              <button
                className="btn btn-success w-50"
                onClick={approveAccess}
              >
                Approve
              </button>

              <button
                className="btn btn-danger w-50"
                onClick={rejectAccess}
              >
                Reject
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
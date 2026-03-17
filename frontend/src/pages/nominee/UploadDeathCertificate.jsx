import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UploadDeathCertificate() {

  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();

    // FRONTEND DEMO SIMULATION
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "nominee");
    localStorage.setItem("deathVerified", "pending");

    navigate("/nominee/pending");
  };

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-4">

        <h2>
          Upload <span className="gold">Death Certificate</span>
        </h2>

        <p className="text-muted mx-auto" style={{ maxWidth: 700 }}>
          To access the digital vault, nominees must submit a valid
          government-issued death certificate. Our verification team
          will review the document before granting any access.
        </p>

      </div>

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="glass-card hover-card p-4">

            <form onSubmit={handleUpload}>

              {/* FILE INPUT */}
              <div className="mb-3">

                <label className="form-label">
                  Upload Certificate
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept=".pdf,.jpg,.png"
                  required
                  onChange={(e) =>
                    setFileName(e.target.files[0]?.name)
                  }
                />

                {fileName && (
                  <p className="small text-muted mt-2">
                    Selected: {fileName}
                  </p>
                )}

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="btn btn-gold w-100"
              >
                Submit for Verification
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}
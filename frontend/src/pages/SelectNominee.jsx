import { useState } from "react";

export default function SelectNominee() {

  const [nomineeName, setNomineeName] = useState("");
  const [nomineeEmail, setNomineeEmail] = useState("");
  const [relation, setRelation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Nominee added successfully (frontend demo)");

    setNomineeName("");
    setNomineeEmail("");
    setRelation("");
  };

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h2>
          Add a <span className="gold">Trusted Nominee</span>
        </h2>

        <p className="text-muted mx-auto" style={{ maxWidth: 700 }}>
          A nominee is someone you trust who will receive access to your
          digital vault after verification. You remain in full control of
          what information they can access.
        </p>
      </div>

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="glass-card hover-card p-4">

            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="mb-3">
                <label className="form-label">
                  Nominee Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter nominee name"
                  value={nomineeName}
                  onChange={(e) => setNomineeName(e.target.value)}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label">
                  Nominee Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter nominee email"
                  value={nomineeEmail}
                  onChange={(e) => setNomineeEmail(e.target.value)}
                  required
                />
              </div>

              {/* RELATION */}
              <div className="mb-3">
                <label className="form-label">
                  Relationship
                </label>

                <select
                  className="form-control"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  required
                >
                  <option value="">Select relationship</option>
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Spouse</option>
                  <option>Brother</option>
                  <option>Sister</option>
                  <option>Friend</option>
                  <option>Lawyer</option>
                  <option>Other</option>
                </select>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="btn btn-gold w-100"
              >
                Save Nominee
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}
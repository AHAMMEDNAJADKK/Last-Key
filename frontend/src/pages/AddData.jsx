import { useState } from "react";

export default function AddData() {

  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Document added to vault (frontend demo)");

    e.target.reset();
  };

  return (
    <div className="container py-5">

      {/* PAGE HEADER */}
      <div className="text-center mb-4">

        <h2>
          Add Data to Your <span className="gold">Vault</span>
        </h2>

        <p className="text-muted">
          Upload documents, credentials, or important files securely.
        </p>

      </div>

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="glass-card hover-card p-4">

            <form onSubmit={handleSubmit}>

              {/* DOCUMENT NAME */}
              <div className="mb-3">
                <label className="form-label">
                  Document Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Example: Passport Copy"
                  required
                />
              </div>

              {/* CATEGORY */}
              <div className="mb-3">
                <label className="form-label">
                  Category
                </label>

                <select className="form-control">
                  <option>Government ID</option>
                  <option>Financial Details</option>
                  <option>Personal Message</option>
                  <option>Business Document</option>
                  <option>Photos / Media</option>
                  <option>Other</option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <div className="mb-3">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Optional notes about this document"
                ></textarea>
              </div>

              {/* FILE UPLOAD */}
              <div className="mb-3">
                <label className="form-label">
                  Upload File
                </label>

                <input
                  type="file"
                  className="form-control"
                  required
                  onChange={(e) => setFileName(e.target.files[0]?.name)}
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
                Add to Vault
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

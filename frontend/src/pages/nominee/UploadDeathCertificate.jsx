import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../api";

export default function UploadDeathCertificate() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      await API.post(
        "/verification/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      navigate("/nominee/pending");

    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="text-center mb-4">
        <h2>
          Upload <span className="gold">Death Certificate</span>
        </h2>

        <p className="text-muted mx-auto" style={{ maxWidth: 700 }}>
          Submit official proof for verification. Access is granted only after approval.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="glass-card hover-card p-4">

            <form onSubmit={handleUpload}>

              <div className="mb-3">
                <label className="form-label">
                  Upload Certificate
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept=".pdf,.jpg,.png"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <button
                type="submit"
                className="btn btn-gold w-100"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Submit for Verification"}
              </button>

            </form>

          </div>

        </div>
      </div>

    </div>
  );
}
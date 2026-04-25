import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api";

const CATEGORIES = [
  "Government ID",
  "Financial",
  "Personal",
  "Business",
  "Medical",
  "Legal",
  "Property",
  "Insurance",
  "Other",
];

export default function AddData() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "Government ID",
  });

  const [file, setFile]           = useState(null);
  const [fileName, setFileName]   = useState("");
  const [loading, setLoading]     = useState(false);
  const [progress, setProgress]   = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const picked = e.target.files[0];
    if (!picked) return;

    // Client-side size guard (10MB)
    if (picked.size > 10 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 10MB.");
      e.target.value = "";
      return;
    }

    setFile(picked);
    setFileName(picked.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    if (!form.title.trim()) {
      toast.error("Please enter a document title.");
      return;
    }

    const toastId = toast.loading("Uploading to vault...");
    setLoading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("title",    form.title.trim());
      formData.append("category", form.category);
      formData.append("file",     file);

      // ✅ Do NOT set Content-Type manually for FormData — axios sets it
      //    automatically with the correct multipart boundary.
      await API.post("/documents", formData, {
        onUploadProgress: (evt) => {
          const pct = Math.round((evt.loaded * 100) / evt.total);
          setProgress(pct);
        },
      });

      toast.success("Document uploaded successfully!", { id: toastId });
      navigate("/user/view-data");

    } catch (error) {
      const msg = error.response?.data?.message || "Upload failed. Please try again.";
      toast.error(msg, { id: toastId });
      console.log("Upload error response data:", error.response?.data);
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div style={{ minHeight: "80vh", padding: "60px 24px" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{ color: "var(--primary)", fontSize: "2rem", fontWeight: 800 }}>
            Add to Your Vault
          </h1>
          <p style={{ color: "var(--gray-400)", marginTop: 8 }}>
            Your documents are encrypted before storage.
          </p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: 36 }}>
          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "var(--primary-dark)", fontSize: "0.88rem" }}>
                Document Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Aadhar Card, Passport..."
                value={form.title}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* Category */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "var(--primary-dark)", fontSize: "0.88rem" }}>
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={inputStyle}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* File picker */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "var(--primary-dark)", fontSize: "0.88rem" }}>
                File (PDF, JPG, PNG, WEBP — max 10MB) *
              </label>
              <label
                htmlFor="fileInput"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  border: "2px dashed rgba(68,45,130,0.3)",
                  borderRadius: 12,
                  cursor: "pointer",
                  background: "rgba(68,45,130,0.03)",
                  transition: "border-color 0.2s",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#442d82" strokeWidth="2" strokeLinecap="round"/>
                  <polyline points="17 8 12 3 7 8" stroke="#442d82" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="3" x2="12" y2="15" stroke="#442d82" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span style={{ color: fileName ? "var(--primary)" : "var(--gray-400)", fontSize: "0.88rem", fontWeight: 500 }}>
                  {fileName || "Click to choose file"}
                </span>
              </label>
              <input
                id="fileInput"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                onChange={handleFileChange}
                style={{ display: "none" }}
                required
              />
            </div>

            {/* Progress bar */}
            {loading && progress > 0 && (
              <div style={{ marginBottom: 18 }}>
                <div style={{ height: 6, background: "var(--gray-200)", borderRadius: 99 }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${progress}%`,
                      background: "var(--accent)",
                      borderRadius: 99,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--gray-400)", marginTop: 4, textAlign: "right" }}>
                  {progress}%
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary-lk"
              disabled={loading}
              style={{ width: "100%", justifyContent: "center", padding: "13px 0", fontSize: "0.95rem" }}
            >
              {loading ? "Uploading…" : "🔐 Encrypt & Upload"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  border: "1.5px solid rgba(68,45,130,0.2)",
  borderRadius: 10,
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  outline: "none",
  color: "var(--gray-700)",
  background: "#fff",
  boxSizing: "border-box",
};
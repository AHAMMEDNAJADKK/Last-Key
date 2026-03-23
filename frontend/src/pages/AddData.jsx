import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AddData() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "Government ID",
    description: "",
    file: null,
  });

  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, file });
    setFileName(file?.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("file", form.file);

      await API.post("/documents", formData);

      alert("✅ Uploaded successfully");

      navigate("/user/view-data");
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2>
          Add Data to Your <span className="gold">Vault</span>
        </h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="glass-card p-4">

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Document Name"
                className="form-control mb-3"
                required
                onChange={handleChange}
              />

              <select
                name="category"
                className="form-control mb-3"
                onChange={handleChange}
              >
                <option>Government ID</option>
                <option>Financial</option>
                <option>Personal</option>
              </select>

              <textarea
                name="description"
                className="form-control mb-3"
                placeholder="Description"
                onChange={handleChange}
              />

              <input
                type="file"
                className="form-control mb-3"
                required
                onChange={handleFileChange}
              />

              {fileName && <p>Selected: {fileName}</p>}

              <button className="btn btn-gold w-100">
                Upload
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import API from "../api";

export default function ViewData() {
  const [documents, setDocuments] = useState([]);
  const [category, setCategory] = useState("all");

  const fetchDocs = async () => {
    try {
      const { data } = await API.get("/documents");
      setDocuments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/documents/${id}`);
      fetchDocs();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container py-5">

      {/* HEADER */}
      <h2 className="text-center mb-4">
        Your <span className="gold">Vault</span>
      </h2>

      {/* ✅ CATEGORY FILTER */}
      <div className="mb-4 text-center">
        <select
          className="form-control w-50 mx-auto"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Government IDs">Government IDs</option>
          <option value="Bank & Crypto Details">Bank & Crypto</option>
          <option value="Photos & Videos">Photos & Videos</option>
          <option value="Business Documents">Business</option>
          <option value="Personal Messages">Messages</option>
        </select>
      </div>

      <div className="row g-4">

        {documents.length === 0 ? (
          <p className="text-center">No documents</p>
        ) : (
          documents
            .filter(
              (doc) => category === "all" || doc.category === category
            )
            .map((doc) => (
              <div className="col-md-4" key={doc._id}>
                <div className="glass-card p-4 text-center">

                  {/* TITLE */}
                  <h5>{doc.title}</h5>
                  <p>{doc.category}</p>

                  {/* ✅ PREVIEW */}
                  {doc.fileType?.startsWith("image") && (
                    <img
                      src={doc.fileUrl}
                      alt="preview"
                      className="preview-img mb-2"
                    />
                  )}

                  {doc.fileType?.startsWith("video") && (
                    <video controls className="preview-video mb-2">
                      <source src={doc.fileUrl} />
                    </video>
                  )}

                  {doc.fileType?.includes("pdf") && (
                    <iframe
                      src={doc.fileUrl}
                      title="preview"
                      className="preview-img mb-2"
                    />
                  )}

                  {/* VIEW BUTTON */}
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-gold btn-sm mt-2"
                  >
                    View
                  </a>

                  {/* ✅ DOWNLOAD BUTTON */}
                  <a
                    href={doc.fileUrl}
                    download
                    className="btn btn-success btn-sm mt-2 ms-2"
                  >
                    Download
                  </a>

                  {/* DELETE */}
                  <button
                    className="btn btn-danger btn-sm mt-2 d-block mx-auto"
                    onClick={() => handleDelete(doc._id)}
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))
        )}

      </div>

    </div>
  );
}
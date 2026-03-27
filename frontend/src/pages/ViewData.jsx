import { useEffect, useState } from "react";
import API from "../api";

export default function ViewData() {
  const [documents, setDocuments] = useState([]);

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

      <h2 className="text-center mb-5">
        Your <span className="gold">Vault</span>
      </h2>

      <div className="row g-4">

        {documents.length === 0 ? (
          <p className="text-center">No documents</p>
        ) : (
          documents.map((doc) => (
            <div className="col-md-4" key={doc._id}>
              <div className="glass-card p-4 text-center">

                {/* ✅ FIXED */}
                <h5>{doc.title}</h5>
                <p>{doc.category}</p>

                {/* ✅ Cloudinary URL direct */}
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold btn-sm"
                >
                  View
                </a>

                <button
                  className="btn btn-danger btn-sm mt-2"
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
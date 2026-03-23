import { useEffect, useState } from "react";
import API from "../api";

export default function ViewData() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    const { data } = await API.get("/documents");
    setDocuments(data);
  };

  const handleDelete = async (id) => {
    await API.delete(`/documents/${id}`);
    fetchDocs();
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

                <h5>{doc.name}</h5>
                <p>{doc.category}</p>

                <a
                  href={`http://localhost:5000${doc.fileUrl}`}
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
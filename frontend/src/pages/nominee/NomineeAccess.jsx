import { useEffect, useState } from "react";
import API from "../../api";

export default function NomineeAccess() {

  const [documents, setDocuments] = useState([]);

  // 📡 FETCH DOCUMENTS FROM BACKEND
  const fetchDocs = async () => {
    try {
      const { data } = await API.get("/nominees/documents");
      setDocuments(data);
    } catch (error) {
      alert(error.response?.data?.message || "Access denied");
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-5">
        <h2>
          Authorized <span className="gold">Vault Access</span>
        </h2>

        <p className="text-muted mx-auto" style={{ maxWidth: 700 }}>
          You now have secure access to the verified user's documents.
          Only approved data is shown here.
        </p>
      </div>

      {/* DOCUMENT LIST */}
      <div className="row g-4">

        {documents.length === 0 ? (
          <p className="text-center">No documents available</p>
        ) : (
          documents.map((doc) => (

            <div className="col-md-4" key={doc._id}>

              <div className="glass-card hover-card p-4 text-center">

                <h5>{doc.title}</h5>

                <p className="text-muted mt-2">
                  {doc.category}
                </p>

                {/* 👁 VIEW */}
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold btn-sm"
                >
                  View
                </a>

                {/* ⬇ DOWNLOAD */}
                <a
                  href={doc.fileUrl}
                  download
                  className="btn btn-outline-light btn-sm mt-2"
                >
                  Download
                </a>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}
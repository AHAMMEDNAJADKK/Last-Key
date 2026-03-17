import { Navigate } from "react-router-dom";

export default function NomineeAccess() {

  const verified = localStorage.getItem("deathVerified");

  if (verified !== "true") {
    return <Navigate to="/nominee/login" />;
  }

  const documents = [
    {
      icon: "📜",
      title: "Digital Will",
      desc: "Final instructions and personal wishes left by the owner."
    },
    {
      icon: "🪪",
      title: "Identity Documents",
      desc: "Important ID documents like Aadhaar, Passport and PAN."
    },
    {
      icon: "🏦",
      title: "Financial Records",
      desc: "Bank details, investments and financial information."
    }
  ];

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-5">
        <h2>
          Authorized <span className="gold">Vault Access</span>
        </h2>

        <p className="text-muted mx-auto" style={{maxWidth:700}}>
          Verification has been completed successfully. You now have
          secure access to the documents entrusted to you by the
          account owner.
        </p>
      </div>

      {/* DOCUMENT LIST */}
      <div className="row g-4">

        {documents.map((doc, index) => (

          <div className="col-md-4" key={index}>

            <div className="glass-card hover-card p-4 text-center">

              <div className="card-icon mb-2">
                {doc.icon}
              </div>

              <h5>{doc.title}</h5>

              <p className="text-muted mt-2">
                {doc.desc}
              </p>

              <button className="btn btn-gold mt-3">
                Download
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
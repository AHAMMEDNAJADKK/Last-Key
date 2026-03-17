export default function ViewData() {

  const documents = [
    {
      name: "Aadhaar Card",
      category: "Government ID",
      icon: "🪪"
    },
    {
      name: "Property Papers",
      category: "Legal Document",
      icon: "📄"
    },
    {
      name: "Bank Documents",
      category: "Financial",
      icon: "🏦"
    }
  ];

  return (
    <div className="container py-5">

      {/* PAGE HEADER */}
      <div className="text-center mb-5">
        <h2>
          Your <span className="gold">Secure Vault</span>
        </h2>
        <p className="text-muted">
          View and manage the documents stored in your digital legacy vault.
        </p>
      </div>

      <div className="row g-4">

        {documents.map((doc, index) => (
          <div className="col-md-4" key={index}>

            <div className="glass-card hover-card p-4 text-center">

              <div className="card-icon mb-2">
                {doc.icon}
              </div>

              <h5>{doc.name}</h5>

              <p className="text-muted">
                {doc.category}
              </p>

              <div className="d-flex justify-content-center gap-2 mt-3">

                <button className="btn btn-gold btn-sm">
                  Download
                </button>

                <button className="btn btn-outline-danger btn-sm">
                  Delete
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
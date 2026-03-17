export default function Security() {
  const features = [
    {
      icon: "🔐",
      title: "End-to-End Encryption",
      text: "All documents are encrypted before storage ensuring that only authorized users can access sensitive data."
    },
    {
      icon: "🧾",
      title: "Legal Verification",
      text: "Access to vault data is granted only after proper verification of legal documents such as death certificates."
    },
    {
      icon: "👁",
      title: "Zero-Knowledge Storage",
      text: "Our system ensures that even the platform itself cannot view the contents of your private documents."
    },
    {
      icon: "🔑",
      title: "Role-Based Access",
      text: "Different roles such as user, nominee, and admin ensure secure and controlled access to data."
    },
    {
      icon: "🛡",
      title: "Secure Cloud Storage",
      text: "Files are stored securely using modern cloud infrastructure with multiple layers of protection."
    },
    {
      icon: "📜",
      title: "Audit & Activity Logs",
      text: "Every action in the system is logged so that document access and verification activities are transparent."
    }
  ];

  return (
    <div className="container py-5">

      {/* PAGE HEADER */}
      <div className="text-center mb-5">
        <h1 className="fw-bold gold">Security & Privacy</h1>

        <p
          className="text-muted mx-auto mt-3"
          style={{ maxWidth: "700px" }}
        >
          LastKey is built with security as its foundation. Your documents,
          credentials, and memories are protected using modern encryption,
          strict verification workflows, and secure infrastructure.
        </p>
      </div>

      {/* SECURITY FEATURES */}
      <div className="row g-4">

        {features.map((feature, index) => (
          <div className="col-md-4" key={index}>
            <div className="glass-card p-4 h-100 text-center security-card">

              <div className="security-icon mb-3">
                {feature.icon}
              </div>

              <h5 className="fw-semibold">
                {feature.title}
              </h5>

              <p className="text-muted mt-2">
                {feature.text}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* TRUST SECTION */}
      <div className="glass-card p-5 text-center mt-5">

        <h3 className="fw-bold mb-3">
          Built For Long-Term Trust
        </h3>

        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Digital legacy platforms require absolute trust. LastKey ensures
          your data remains secure for generations through strong encryption,
          verified nominee access, and strict administrative oversight.
        </p>

      </div>

    </div>
  );
}
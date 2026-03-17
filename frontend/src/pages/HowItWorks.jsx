export default function HowItWorks() {
  const steps = [
    {
      icon: "🔐",
      title: "1. Create Your Secure Account",
      text: "Sign up and create your personal digital vault. Your account is protected using strong authentication and modern security practices."
    },
    {
      icon: "📂",
      title: "2. Upload Your Important Data",
      text: "Store documents, passwords, messages, media files, financial details, or any information you want to preserve for the future."
    },
    {
      icon: "👨‍👩‍👧",
      title: "3. Choose Your Nominee",
      text: "Assign one or more trusted nominees who will receive access to your vault when the proper verification process is completed."
    },
    {
      icon: "🛡",
      title: "4. Verification Process",
      text: "When access is requested, official verification such as a death certificate is required. This prevents unauthorized access."
    },
    {
      icon: "📜",
      title: "5. Secure Data Release",
      text: "After verification, the nominee receives controlled access to the information you chose to share with them."
    }
  ];

  return (
    <div className="container py-5">

      {/* PAGE HEADER */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">How LastKey Works</h1>

        <p
          className="text-muted mx-auto mt-3"
          style={{ maxWidth: 700 }}
        >
          LastKey protects your digital legacy by securely storing your
          important information and releasing it only to trusted people
          after proper verification.
        </p>
      </div>

      {/* STEPS */}
      <div className="row g-4">

        {steps.map((step, index) => (
          <div className="col-md-4" key={index}>

            <div className="glass-card hover-card p-4 text-center">

              <div className="card-icon mb-3">
                {step.icon}
              </div>

              <h5>{step.title}</h5>

              <p className="text-muted mt-2">
                {step.text}
              </p>

            </div>

          </div>
        ))}

      </div>

      {/* SUMMARY SECTION */}
      <div className="glass-card p-5 text-center mt-5">

        <h3 className="mb-3">
          A Simple Process With Maximum Security
        </h3>

        <p
          className="text-muted mx-auto"
          style={{ maxWidth: 750 }}
        >
          LastKey ensures your most important digital assets remain safe
          throughout your lifetime and beyond. With encrypted storage,
          trusted nominee assignment, and strict verification procedures,
          your digital legacy is handled with the highest level of care.
        </p>

      </div>

    </div>
  );
}
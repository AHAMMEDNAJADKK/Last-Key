export default function About() {
  const features = [
    {
      icon: "🔐",
      title: "Secure Digital Vault",
      text: "Store your most sensitive documents, passwords, and media safely using modern encryption."
    },
    {
      icon: "👨‍👩‍👧",
      title: "Trusted Nominee System",
      text: "Assign trusted nominees who can access selected data only after proper verification."
    },
    {
      icon: "🛡",
      title: "Legal Verification Process",
      text: "Access is granted only after legal verification such as a death certificate review."
    },
    {
      icon: "🌍",
      title: "Built for the Digital Era",
      text: "As more of our lives move online, protecting digital assets has become essential."
    }
  ];

  return (
    <div className="container py-5">

      {/* PAGE HEADER */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">About LastKey</h1>

        <p
          className="text-muted mx-auto mt-3"
          style={{ maxWidth: 750 }}
        >
          LastKey was created to solve one of the most overlooked problems
          of the digital age — what happens to your digital life when
          you're no longer here to manage it.
        </p>
      </div>

      {/* PROBLEM SECTION */}
      <div className="glass-card hover-card p-4 mb-4">
        <h4>The Problem</h4>

        <p className="text-muted mt-2">
          Today, people store important information online — banking
          details, photos, personal messages, business credentials,
          and more. When someone passes away unexpectedly, family
          members often struggle to access these digital assets.
        </p>

        <p className="text-muted">
          Without proper planning, important memories and critical
          information may be lost forever.
        </p>
      </div>

      {/* MISSION & VISION */}
      <div className="row g-4">

        <div className="col-md-6">
          <div className="glass-card hover-card p-4 h-100">
            <h4>Our Mission</h4>

            <p className="text-muted mt-2">
              Our mission is to give individuals full control over
              their digital legacy by offering a secure platform
              where important information can be stored, protected,
              and responsibly shared when needed.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="glass-card hover-card p-4 h-100">
            <h4>Our Vision</h4>

            <p className="text-muted mt-2">
              We envision a future where digital inheritance is as
              common and secure as traditional wills — ensuring
              families never lose access to important information
              and memories.
            </p>
          </div>
        </div>

      </div>

      {/* WHY LASTKEY */}
      <div className="mt-5">

        <h3 className="text-center mb-4">
          Why Choose LastKey
        </h3>

        <div className="row g-4">

          {features.map((item, index) => (
            <div className="col-md-3" key={index}>

              <div className="glass-card hover-card p-4 text-center">

                <div className="card-icon mb-2">
                  {item.icon}
                </div>

                <h5>{item.title}</h5>

                <p className="text-muted mt-2">
                  {item.text}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
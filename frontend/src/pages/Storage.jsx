export default function Storage() {

  const storageItems = [
    {
      icon: "🪪",
      title: "Government IDs",
      text: "Securely store Aadhaar, Passport, PAN, driving license, and other identity documents."
    },
    {
      icon: "🏦",
      title: "Bank & Crypto Details",
      text: "Protect banking credentials, crypto wallets, and financial information for trusted access."
    },
    {
      icon: "🔑",
      title: "Social Media Credentials",
      text: "Store login information for important online accounts and services."
    },
    {
      icon: "📸",
      title: "Photos & Videos",
      text: "Preserve precious memories and personal media for your loved ones."
    },
    {
      icon: "📊",
      title: "Business Documents",
      text: "Keep confidential company data, contracts, and digital business assets protected."
    },
    {
      icon: "💌",
      title: "Personal Messages",
      text: "Leave private letters, final wishes, or messages for family and friends."
    }
  ];

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-5">
        <h1>
          What You Can <span className="gold">Store</span>
        </h1>

        <p className="text-muted mx-auto" style={{ maxWidth: 800 }}>
          LastKey allows you to securely store everything that matters in one
          encrypted digital vault — ensuring your information is protected
          and accessible only when the right conditions are met.
        </p>
      </div>

      {/* STORAGE ITEMS */}
      <div className="row g-4">

        {storageItems.map((item, i) => (

          <div className="col-md-6" key={i}>

            <div className="glass-card hover-card p-4">

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
  );
}
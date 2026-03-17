import { Link } from "react-router-dom";

export default function Home() {
  const storageItems = [
    { icon: "🪪", title: "Government IDs" },
    { icon: "💳", title: "Bank & Crypto Details" },
    { icon: "💌", title: "Private Messages" },
    { icon: "💼", title: "Business Credentials" },
    { icon: "📷", title: "Photos & Videos" },
    { icon: "📜", title: "Final Wishes" }
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="hero-bg text-center d-flex align-items-center"
        style={{
          minHeight: "90vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container">

          <h1 className="display-4 fw-bold">
            Your Digital <span className="gold">Legacy</span>
          </h1>

          <p
            className="mt-3 mx-auto text-muted"
            style={{ maxWidth: 650 }}
          >
            Protect your digital life. Secure your documents, assets,
            memories and messages — released only to the right people
            at the right time.
          </p>

          <Link to="/register" className="btn btn-gold mt-4">
            Get Started Securely
          </Link>

        </div>
      </section>

      {/* WHY SECTION */}
      <section className="container py-5">

        <h2 className="text-center mb-4">
          Why Digital Legacy Matters
        </h2>

        <p
          className="text-muted text-center mx-auto"
          style={{ maxWidth: 800 }}
        >
          In today’s digital world, many of our most valuable assets exist
          online. Without a clear plan, loved ones may never gain access
          to important documents or memories. LastKey ensures your legacy
          remains protected and accessible to the right people.
        </p>

      </section>

      {/* STORAGE TYPES */}
      <section className="bg-dark py-5">

        <div className="container">

          <h2 className="text-center mb-5">
            What You Can Secure
          </h2>

          <div className="row g-4">

            {storageItems.map((item, i) => (
              <div className="col-md-4" key={i}>

                <div className="glass-card hover-card p-4 text-center">

                  <div className="card-icon mb-2">
                    {item.icon}
                  </div>

                  <h5>{item.title}</h5>

                  <p className="text-muted mt-2">
                    Encrypted, protected, and released only after
                    verification.
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CALL TO ACTION */}
      <section className="container py-5 text-center">

        <h2>Secure Tomorrow, Today</h2>

        <p className="text-muted mt-3">
          Take control of your digital legacy and ensure your loved
          ones can access what truly matters.
        </p>

        <Link to="/register" className="btn btn-gold mt-3">
          Create Your Digital Will
        </Link>

      </section>
    </>
  );
}
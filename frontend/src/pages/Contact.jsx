import { useState } from "react";

export default function Contact() {

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-5">
        <h1>Contact Us</h1>

        <p
          className="text-muted mx-auto"
          style={{ maxWidth: 700 }}
        >
          Have questions about protecting your digital legacy?
          Our team is here to help you understand how LastKey
          keeps your information secure for the future.
        </p>
      </div>

      <div className="row g-4">

        {/* CONTACT INFO */}
        <div className="col-md-4">

          <div className="glass-card hover-card p-4">

            <h5 className="mb-3">Get in Touch</h5>

            <p className="text-muted">
              Reach out to us anytime. We typically respond within 24 hours.
            </p>

            <div className="mt-3">
              <p>📧 support@lastkey.com</p>
              <p>🌍 www.lastkey.com</p>
              <p>📍 Digital Legacy Platform</p>
            </div>

          </div>

        </div>


        {/* CONTACT FORM */}
        <div className="col-md-8">

          <div className="glass-card hover-card p-4">

            {submitted ? (

              <div className="text-center py-4">
                <h4>✅ Message Sent</h4>
                <p className="text-muted">
                  Thank you for contacting us. Our team will get back to you soon.
                </p>
              </div>

            ) : (

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                    />
                  </div>

                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button className="btn btn-gold">
                  Send Message
                </button>

              </form>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}
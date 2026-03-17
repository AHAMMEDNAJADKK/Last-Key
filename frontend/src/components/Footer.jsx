import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container py-5">
        <div className="row gy-4">

          {/* BRAND */}
          <div className="col-md-4">
            <h4 className="gold fw-bold">LastKey</h4>
            <p className="footer-text mt-3">
              LastKey is a secure digital legacy platform that protects
              your most important documents, memories, and assets —
              ensuring access only to the right people, at the right time.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="col-md-2">
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/how">How It Works</Link></li>
              <li><Link to="/security">Security</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="col-md-3">
            <h6 className="footer-title">Security & Trust</h6>
            <ul className="footer-links">
              <li>End-to-End Encryption</li>
              <li>Multi-Layer Verification</li>
              <li>Time-Locked Access</li>
              <li>GDPR Compliant</li>
              <li>Zero-Knowledge Storage</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-3">
            <h6 className="footer-title">Contact</h6>
            <p className="footer-text">
              📧 support@lastkey.com <br />
              🌍 Available Worldwide <br />
              🔐 Trusted & Secure
            </p>
          </div>

        </div>

        <hr className="footer-line" />

        <div className="text-center footer-bottom">
          © {new Date().getFullYear()} LastKey. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

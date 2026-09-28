import "../styles/Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">

      {/* Top Section */}
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-section">
          <h2>EatUp</h2>
          <p>Fast. Fresh. Delivered.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/cart"  className="footer-link">Cart</Link>
          <Link to="/profile"  className="footer-link">Profile</Link>
          <a className="footer-link">Login/SignUp</a>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@eatup.com</p>
          <p>Phone: +91 7396635910</p>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-twitter"></i>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 EatUp. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
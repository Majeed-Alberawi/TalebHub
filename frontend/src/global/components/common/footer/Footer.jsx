import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Logo and Description Section */}
          <div className="footer-brand">
            <Logo />
            <p className="footer-description">
              Empowering students with quality education and innovative learning
              experiences. Join thousands of learners advancing their careers
              through our comprehensive courses.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <FontAwesomeIcon icon={faPaperPlane} className="icon" />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <FontAwesomeIcon icon={faWhatsapp} className="icon" />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} className="icon" />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FontAwesomeIcon icon={faXTwitter} className="icon" />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} className="icon" />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="icon" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/courses">All Courses</Link>
              </li>
              <li>
                <Link to="/instructorsPage">Instructors</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          {/* <div className="footer-section">
            <h3 className="footer-title">Course Categories</h3>
            <ul className="footer-links">
              <li>
                <Link to="/courses/programming">Programming</Link>
              </li>
              <li>
                <Link to="/courses/design">Design</Link>
              </li>
              <li>
                <Link to="/courses/business">Business</Link>
              </li>
              <li>
                <Link to="/courses/marketing">Marketing</Link>
              </li>
              <li>
                <Link to="/courses/data-science">Data Science</Link>
              </li>
              <li>
                <Link to="/courses/languages">Languages</Link>
              </li>
            </ul>
          </div> */}

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li>
                <Link to="/help">Help Center</Link>
              </li>
              <li>
                <Link to="/qa">Q&A Forum</Link>
              </li>
              <li>
                <Link to="/support">Student Support</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/accessibility">Accessibility</Link>
              </li>
              <li>
                <Link to="/feedback">Feedback</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Get In Touch</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>support@university.edu</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>123 Education St, Learning City, LC 12345</span>
              </div>
            </div>
            <div className="footer-newsletter">
              <h4>Stay Updated</h4>
              <p>Subscribe to our newsletter for course updates and news.</p>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="newsletter-input"
                />
                <button className="newsletter-button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025{" "}
              <u>
                <b>PixelCircusStudio</b>
              </u>
              . All rights reserved for.
            </p>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

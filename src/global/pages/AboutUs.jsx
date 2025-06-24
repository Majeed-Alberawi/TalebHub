import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faBookOpen,
  // faBullseye,
  faHeart,
  // faLightbulb,
  faMessage,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/Logo";
import Header from "../components/common/Header/Header";

export default function AboutUs() {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <div className="hero-section landing-upspace">
        <div className="container">
          <Header />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Logo color="inverted" />
            </div>
            <h1 className="hero-title">
              <span className="rocket-icon">🚀</span>A Project by Students — For
              Students
            </h1>
            <p className="hero-description">
              We are a group of university students who fully understand the
              challenges faced by our fellow students in organizing study
              materials, staying in touch with professors, and accessing
              everything needed for academic success in one convenient place.
            </p>
            <div className="platform-highlight">
              That's where the idea of <strong>"TalebHub"</strong> was born — an
              educational platform specifically designed to serve students, with
              guidance from our professors and based on our firsthand experience
              of real academic needs.
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="container">
          <div className="section-header">
            {/* <div className="section-icon">
              <FontAwesomeIcon icon={faBullseye} className="icon" />
            </div> */}
            <h2 className="section-title">🎯 Our Mission</h2>
            <p className="section-subtitle">
              To provide a simple, practical tool that brings together:
            </p>
          </div>

          <div className="mission-grid">
            <div className="mission-card">
              <div className="card-icon">
                <FontAwesomeIcon icon={faBookOpen} className="icon" />
              </div>
              <h3>Organized Courses</h3>
              <p>Structured study materials and course content in one place</p>
            </div>

            <div className="mission-card">
              <div className="card-icon">
                <FontAwesomeIcon icon={faMessage} className="icon" />
              </div>
              <h3>Easy Communication</h3>
              <p>Seamless connection between students and instructors</p>
            </div>

            <div className="mission-card">
              <div className="card-icon">
                <FontAwesomeIcon icon={faArrowTrendUp} className="icon" />
              </div>
              <h3>Progress Tracking</h3>
              <p>Continuous monitoring of your academic journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why We Built Section */}
      <div className="why-section">
        <div className="container">
          <div className="why-content">
            <div className="why-text">
              <h2 className="section-title">🤝 Why We Built This Platform</h2>
              <p className="why-description">
                As students, we experience the daily struggle of scattered
                resources, complicated tracking, and wasted time searching for
                lecture notes and files.
              </p>
              <div className="platform-benefits">
                <div>
                  <Logo icon="visible" /> <p>was created to be:</p>
                </div>
                <ul className="benefits-list">
                  <li>Your trusted platform</li>
                  <li>Your quick reference</li>
                  <li>
                    Your bridge to seamless communication with professors and
                    classmates
                  </li>
                </ul>
              </div>
            </div>
            <div className="why-visual">
              <div className="visual-card">
                <FontAwesomeIcon icon={faUsers} className="icon" />
                <h3>Built by Students</h3>
                <p>
                  Created with real student experiences and challenges in mind
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="vision-section">
        <div className="container">
          <div className="vision-content">
            {/* <div className="vision-icon">
              <FontAwesomeIcon icon={faLightbulb} className="icon" />
            </div> */}
            <h2 className="section-title">💡 Our Vision</h2>
            <p className="vision-text">
              To make university education more flexible, organized, and
              efficient — offering every student a high-quality learning
              experience, wherever they are.
            </p>
          </div>
        </div>
      </div>

      {/* Final Word Section */}
      <div className="final-section">
        <div className="container">
          <div className="final-content">
            <h2 className="section-title">✨ A Final Word</h2>
            <p className="final-text">
              This project started from a real student experience… and with the
              collaboration of everyone, we will continue improving and
              developing it to deliver the best for every university student
              striving for excellence.
            </p>
            <div className="cta-section">
              <FontAwesomeIcon icon={faHeart} className="heart-icon" />
              <span>Made with passion by students, for students</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

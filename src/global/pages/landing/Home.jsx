import { Link } from "react-router-dom";
import landingImg from "../../../assets/Classroom-bro.svg";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubjectsDisplay from "../../components/SubjectsDisplay";
import StudentReviewsCarousel from "../../components/StudentReviewsCarousel";
import Header from "../../components/common/Header/Header";

export default function Home() {
  return (
    <main>
      <div className="landing-main landing-upspace">
        <div className="container">
          <Header />
        </div>

        <div className="landing">
          <div className="container">
            <div className="text-box">
              <h2>
                <span className="logo-text">
                  Taleb<span>Hub</span>
                </span>
                , Your university ... in your pocket
              </h2>
              <p>
                From now on … no need to search through groups, everything is
                here.
              </p>
              <button className="primary-button">
                <Link to="/">
                  Browse Lessons Now
                  <FontAwesomeIcon icon={faArrowRight} className="icon" />
                </Link>
              </button>
            </div>
            <div className="image-box">
              <img src={landingImg} alt="Learning-bro" />
            </div>
          </div>
        </div>
      </div>

      <SubjectsDisplay />
      <StudentReviewsCarousel />
    </main>
  );
}

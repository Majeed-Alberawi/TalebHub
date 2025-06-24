import React, { useState } from "react";
// import { ChevronLeft, ChevronRight, Star, Clock, Users } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Sample course data - replace with your actual data
import courses from "../data/courses";
import {
  faArrowLeft,
  faArrowRight,
  faClock,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

/* 
  🪶 Features
  💠 carouselTitle when add title it will be showen
  💠 Supports course category display via className 'course-category'
  💠 coursesPerSlideNum: defines how many courses are shown per slide (affects pagination logic).
  💠 maxItemsPerRow: defines how many items appear per row inside each slide (controls grid columns).
      Allows dynamic, user-defined grid layouts without depending on screen size or media queries.
  💠 price display: shows the current price and original price of a course,
      allowing presentation of discounts or promotions clearly to the user.
      - visible value will show the price
      - disable value will disable the price
*/

export default function CoursesCarousel({
  carouselTitle = undefined,
  coursesPerSlideNum = 3,
  maxItemsPerRow = 3,
  pricing = "visible",
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const coursesPerSlide = coursesPerSlideNum;
  const totalSlides = Math.ceil(courses.length / coursesPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // const getCurrentCourses = () => {
  //   const startIndex = currentSlide * coursesPerSlide;
  //   return courses.slice(startIndex, startIndex + coursesPerSlide);
  // };

  return (
    <div className="courses-carousel carousel">
      <div className="carousel-header">
        <h2 className="carousel-title">{carouselTitle}</h2>
        <div className="carousel-controls">
          <button
            className="control-btn prev"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="control-btn next"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="carousel-slide"
              style={{
                gridTemplateColumns: `repeat(${maxItemsPerRow}, 1fr)`,
              }}
            >
              {courses
                .slice(
                  slideIndex * coursesPerSlide,
                  (slideIndex + 1) * coursesPerSlide
                )
                .map((course) => (
                  <div key={course.id} className="course-card">
                    <div className="course-image">
                      <img src={course.image} alt={course.title} />

                      {/* Category Feature */}
                      {/* <div className="course-category">{course.category}</div> */}
                    </div>

                    <div className="course-content">
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-instructor">
                        by {course.instructor}
                      </p>

                      <div className="course-stats">
                        <div className="rating">
                          {/* <Star size={14} fill="currentColor" /> */}
                          <FontAwesomeIcon icon={faStar} fill="currentColor" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="students">
                          {/* <Users size={14} /> */}
                          <FontAwesomeIcon icon={faUsers} />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="duration">
                          {/* <Clock size={14} /> */}
                          <FontAwesomeIcon icon={faClock} />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {/* Price Feature */}
                      {pricing === "visible" && (
                        <div className="course-price">
                          <span className="current-price">{course.price}</span>
                          <span className="original-price">
                            {course.originalPrice}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-indicators">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

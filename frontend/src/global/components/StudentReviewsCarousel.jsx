import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";

// Data
import reviews from "../data/reviews";
import SectionHeader from "./SectionHeader";

export default function StudentReviewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample student reviews data - replace with your actual data

  const reviewsPerSlide = 2;
  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="reviews-carousel carousel">
      <div className="container section-container">
        <SectionHeader
          title="What Our Students Say"
          subTitle="Real feedback from real students"
        />

        <div className="carousel-container">
          <button className="control-btn prev-btn" onClick={prevSlide}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <div className="reviews-wrapper">
            <div
              className="reviews-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="reviews-slide">
                  {reviews
                    .slice(
                      slideIndex * reviewsPerSlide,
                      (slideIndex + 1) * reviewsPerSlide
                    )
                    .map((review) => (
                      <div key={review.id} className="review-card">
                        <div className="quote-icon">
                          <FontAwesomeIcon icon={faQuoteLeft} />
                        </div>

                        <div className="review-content">
                          <p className="review-text">{review.review}</p>

                          <div className="review-footer">
                            <div className="student-info">
                              <h4 className="student-name">{review.name}</h4>
                              <p className="course-name">{review.course}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          <button className="control-btn next-btn" onClick={nextSlide}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <div className="carousel-indicators">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

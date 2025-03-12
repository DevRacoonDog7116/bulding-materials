'use client';
import React, { useState, useEffect, useRef } from 'react';
import './carousel.css';

const images = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img5.jpg',
  '/images/img6.jpg',
];

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
      </div>

      <div className="button-group">
        <button onClick={prevSlide}>&lt;</button>
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
        <button onClick={nextSlide}>&gt;</button>
      </div>

      <button className="pause-resume-btn" onClick={togglePause}>
        {isPaused ? '▶' : '⏸'}
      </button>
    </div>
  );
};

export default Carousel;

// CSS (included in the same file as a template literal for inline styling, if needed)
const styles = `
.carousel-container {
  position: relative;
  text-align: center;
}

.carousel-slide img {
  width: 600px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.button-group {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: gray;
  padding: 5px 10px;
  border-radius: 4px;
  margin-top: 10px;
}

.button-group button {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
}

.button-group button:hover {
  opacity: 0.7;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: lightgray;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}

.dot.active {
  background-color: white;
}

.pause-resume-btn {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.pause-resume-btn:hover {
  opacity: 0.8;
}`;

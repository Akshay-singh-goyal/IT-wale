import React, { useState, useEffect } from "react";
import "./HeroSlider.css";
import slide1 from "../../Images/banner1.png";
// import slide2 from "../../Images/banner2.png";
// import slide3 from "../../Images/banner3.png";

const slides = [slide1 /*, slide2, slide3 */];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [length]);

  if (!Array.isArray(slides) || slides.length === 0) return null;

  return (
    <div className="slider">
      {slides.map((img, index) => (
        <div
          className={`slide ${index === current ? "active" : ""}`}
          key={index}
        >
          {index === current && <img src={img} alt={`slide-${index}`} />}
        </div>
      ))}

      {/* Optional: Slide Indicators */}
      <div className="indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === 6 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        [
          ".about-top-left",
          ".about-top-center",
          ".about-top-right",
          ".about-text",
        ],
        {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-container" ref={containerRef}>
      <div className="about-top">
        <div className="about-top-left">
          <p>
            Capturing art, light, emotion, and authentic moments, transforming
            everyday scenes into timeless visual stories with a distinctive
            artistic perspective.
          </p>
        </div>
        <div className="about-top-center">
          <p>
            Bilal Boukachaba,
            <br />
            Creative Photographer,
            <br />& Videographer.
          </p>
        </div>
        <div className="about-top-right">
          <p>
            Based in Casablanca, <br /> Morocco.
          </p>
        </div>
      </div>

      <h2 className="about-text">
        <span>Artist’s</span>
        <div className="about-icon-wrapper">
          <img
            src="/imgs/icon.png"
            alt="icon"
            className="about-icon-placeholder"
          />
          <div className="about-icon-mask">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className={`mask-bg mask-bg-${num} ${currentIndex === num ? "active" : ""}`}
              ></div>
            ))}
          </div>
        </div>
        <span>Lens</span>
      </h2>
    </div>
  );
};

export default About;

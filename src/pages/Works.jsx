import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Works.css";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const worksRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".work-slide");

      gsap.to(containerRef.current, {
        x: () => -(containerRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: worksRef.current,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          end: () =>
            `+=${containerRef.current.scrollWidth - window.innerWidth}`,
        },
      });

      gsap.from(slides, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: worksRef.current,
          start: "top 70%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="works-wrapper" ref={worksRef}>
      <div className="works-container" ref={containerRef}>
        {[10, 8, 1, 2, 3, 5, 6].map((num) => (
          <div key={num} className="work-slide">
            <img
              src={`/imgs/${num}.webp`}
              alt={`Work ${num}`}
              className="work-image"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;

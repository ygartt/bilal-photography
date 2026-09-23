import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/Intro.css";

const Intro = ({ onStartExit, onComplete }) => {
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      tl.fromTo(
        iconRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
      )
        .to(iconRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 1,
          delay: 0.8,
          ease: "power2.inOut",
        })
        .call(() => {
          if (onStartExit) onStartExit();
        })
        .to(
          topPanelRef.current,
          {
            yPercent: -100,
            duration: 1.5,
            ease: "power4.inOut",
          },
          "split",
        )
        .to(
          bottomPanelRef.current,
          {
            yPercent: 100,
            duration: 1.5,
            ease: "power4.inOut",
          },
          "split",
        );
    });

    return () => ctx.revert();
  }, [onComplete, onStartExit]);

  return (
    <div className="intro-container" ref={containerRef}>
      <div className="intro-panel intro-panel-top" ref={topPanelRef}></div>
      <div
        className="intro-panel intro-panel-bottom"
        ref={bottomPanelRef}
      ></div>
      <img
        src="/imgs/icon.png"
        alt="Icon"
        className="intro-icon"
        ref={iconRef}
      />
    </div>
  );
};

export default Intro;

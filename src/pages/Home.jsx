import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Home.css";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const descRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(logoRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          descRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          titleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-container" ref={containerRef}>
      <img
        src="/imgs/logo.png"
        alt="Logo"
        className="home-logo"
        ref={logoRef}
      />
      <img src="/imgs/home.webp" alt="Home" className="home-bg" />

      <div className="home-content">
        <div className="home-left">
          <p className="home-desc" ref={descRef}>
            A visual storyteller and professional photographer dedicated to
            capturing authentic moments and raw emotion. Driven by light,
            shadow, and atmosphere, I document world cultures, human connection,
            and unspoken stories. My approach merges fine-art aesthetics with a
            contemporary documentary eye, transforming fleeting instances into
            timeless visual narratives.
          </p>
        </div>
        <div className="home-right">
          <h1 className="home-title" ref={titleRef}>
            {
              "            creative\n   photographer\n             and videographer."
            }
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;

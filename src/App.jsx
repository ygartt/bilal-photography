import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import Contact from "./pages/Contact";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isIntroDone, setIsIntroDone] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!isIntroDone) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isIntroDone]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(mainRef.current.children);

      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: sections,
          duration: { min: 1.5, max: 3 },
          delay: 0.1,
          ease: "power2.inOut",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleCinematicReveal = () => {
    gsap.fromTo(
      mainRef.current,
      { scale: 1.1, filter: "blur(10px)" },
      {
        scale: 1,
        filter: "blur(0px)",
        duration: 2,
        ease: "power4.out",
        force3D: true,
      },
    );
  };

  return (
    <>
      {!isIntroDone && (
        <Intro
          onStartExit={handleCinematicReveal}
          onComplete={() => setIsIntroDone(true)}
        />
      )}

      <ReactLenis
        root
        options={{
          lerp: 0.03,
          duration: 2.5,
          smoothWheel: true,
          smoothTouch: true,
          wheelMultiplier: 0.6,
          touchMultiplier: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        }}
      >
        <main ref={mainRef}>
          <div className="snap-section">
            <Home />
          </div>
          <div className="snap-section">
            <About />
          </div>
          <div className="snap-section">
            <Works />
          </div>
          <div className="snap-section">
            <Contact />
          </div>
        </main>
      </ReactLenis>
    </>
  );
}

export default App;

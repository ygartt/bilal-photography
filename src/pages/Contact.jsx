import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([".contact-title", ".contact-info-link", ".contact-desc"], {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = "bilalartphotography@gmail.com";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        "_blank",
      );
    }
  };

  const contactInfos = [
    {
      id: "instagram",
      text: "@bilal_art_photography",
      url: "https://www.instagram.com/bilal_art_photography",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      id: "email",
      text: "bilalartphotography@gmail.com",
      url: "#",
      onClick: handleEmailClick,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
    },

    {
      id: "whatsapp",
      text: "+212 695 312 330",
      url: "https://wa.me/212695312330",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section className="contact-container" ref={containerRef}>
      <img
        src="/imgs/contact.webp"
        alt="Contact Background"
        className="contact-image-bg"
      />
      <img src="/imgs/bilal.webp" alt="Bilal" className="contact-image-front" />

      <div className="contact-title-wrapper">
        <h2 className="contact-title">GET IN TOUCH</h2>
      </div>

      <div className="contact-bottom-section">
        <div className="contact-bottom-left">
          {contactInfos.map((item) => (
            <a
              key={item.id}
              href={item.url}
              onClick={item.onClick ? item.onClick : undefined}
              target={item.id !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="contact-info-link"
            >
              <span className="contact-icon">{item.icon}</span>
              <span className="contact-text">{item.text}</span>
            </a>
          ))}
        </div>

        <div className="contact-bottom-right">
          <p className="contact-desc">
            Open to meaningful collaborations, creative projects, and artistic
            visions that deserve to be explored, captured, and transformed into
            something truly memorable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

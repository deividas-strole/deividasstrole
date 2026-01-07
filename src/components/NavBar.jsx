import { useState, useEffect } from "react";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault(); // Prevent adding # to URL
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      // Optionally update browser history without hash
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
      <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
        <div className="inner">
          <a
              href="#hero"
              className="logo"
              onClick={(e) => scrollToSection(e, "hero")}
          >
            <img
                src="/images/deividas-strole.jpg"
                alt="Deividas Strolė"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white/50 hover:ring-white transition-shadow"
            />
          </a>

          <nav className="desktop">
            <ul>
              {navLinks.map(({ link, name }) => {
                const sectionId = link.replace("#", "");
                return (
                    <li key={name} className="group">
                      <a
                          href={link} // Keep for SEO
                          onClick={(e) => scrollToSection(e, sectionId)}
                      >
                        <span>{name}</span>
                        <span className="underline" />
                      </a>
                    </li>
                );
              })}
            </ul>
          </nav>

          <a
              href="#contact"
              className="contact-btn group"
              onClick={(e) => scrollToSection(e, "contact")}
          >
            <div className="inner">
              <span>Contact me</span>
            </div>
          </a>
        </div>
      </header>
  );
};

export default NavBar;

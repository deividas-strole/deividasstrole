import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialLinks } from "../constants";

const Footer = () => {
  return (
      <footer className="footer">
        <div className="footer-container">
          <div className="flex flex-col justify-center">
            {/*<p>Terms & Conditions</p>*/}
          </div>
          <div className="socials">
            {socialLinks.map((social, index) => (
                <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon"
                    aria-label={social.name}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-center md:text-end">
              © {new Date().getFullYear()} Deividas Strole. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
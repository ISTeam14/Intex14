import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>&copy; {new Date().getFullYear()} Team 14</span>
        <Link to="/privacy" className="footer-link">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}

export default Footer;

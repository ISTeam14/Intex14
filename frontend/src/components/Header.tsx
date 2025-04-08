import NavMenu from './NavMenu';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <NavLink to="/home" className="logo-container">
          <div className="logo-container">
            <img src="/CineNiche.jpeg" alt="Logo" width={75} height={75} />
            <h1 className="logo-text">CineNiche</h1>
          </div>
        </NavLink>
        <NavMenu />
      </header>
    </>
  );
}

export default Header;

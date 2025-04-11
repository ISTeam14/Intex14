import { NavLink } from 'react-router-dom';
import './NavMenu.css';
import Logout from './Logout';

function NavMenu() {
  return (
    <nav>
      <ul className="nav-menu">
        <li>
          <NavLink className="nav-link" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/search">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/admin">
            Admin
          </NavLink>
        </li>
        <li>
          <Logout>
            Logout
          </Logout>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;

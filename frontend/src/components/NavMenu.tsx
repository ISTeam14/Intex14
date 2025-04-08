import { NavLink } from 'react-router-dom';

function NavMenu() {
  return (
    <nav>
      <menu>
        <li>
          <NavLink className="nav-link" to="home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="logout">
            Logout
          </NavLink>
        </li>
      </menu>
    </nav>
  );
}

export default NavMenu;

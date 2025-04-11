import { useEffect, useState } from 'react';
import NavMenu from './NavMenu';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = document.cookie
      .split('; ')
      .find(row => row.startsWith('cookieConsent='));
    
    if (!consent) {
      setShowConsent(true);
    } else {
      const saved = document.cookie
        .split('; ')
        .find(row => row.startsWith('theme='))
        ?.split('=')[1];

      if (saved) {
        setTheme(saved as 'light' | 'dark');
        document.body.classList.toggle('light-mode', saved === 'light');
      } else {
        setTheme('dark');
        document.body.classList.remove('light-mode');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('light-mode', newTheme === 'light');
    document.cookie = `theme=${newTheme}; path=/`;
  };

  const handleAcceptCookies = () => {
    document.cookie = 'cookieConsent=true; path=/';
    document.cookie = `theme=${theme}; path=/`;
    setShowConsent(false);
  };

  return (
    <>
      <header className="header-container">
        <NavLink to="/home" className="logo-container">
          <div className="logo-container">
            <img src="/CineNiche.jpeg" alt="Logo" width={75} height={75} />
            <h1 className="logo-text">CineNiche</h1>
          </div>
        </NavLink>

        <div className="right-header-items">
          <NavMenu />

          <div className="theme-toggle-wrapper">
            <label className="switch small">
              <input
                type="checkbox"
                checked={theme === 'light'}
                onChange={toggleTheme}
              />
              <span className="slider round">
                <span className="icon">{theme === 'light' ? '☀️' : '🌙'}</span>
              </span>
            </label>
          </div>
        </div>
      </header>

      {showConsent && (
        <div className="cookie-banner">
          <p>This site uses cookies to remember your theme preference. 🍪</p>
          <button onClick={handleAcceptCookies}>Accept</button>
        </div>
      )}
    </>
  );
}

export default Header;

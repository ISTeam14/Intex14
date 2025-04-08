import NavMenu from './NavMenu';

function Header() {
  return (
    <>
      <header>
        <div className="logo-container">
          <img src="/CineNiche.jpeg" alt="Logo" width={75} height={75} />
          <h1>CineNiche</h1>
        </div>
        <NavMenu />
      </header>
    </>
  );
}

export default Header;

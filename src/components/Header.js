import headerLogo from '../images/logo/logo.svg';
import { Link } from 'react-router-dom';

function Header({ email, title, route, onClick }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Карта россии" />
      <div className="header__auth">
        <p className="header__text">{email}</p>
        <Link to={route} onClick={onClick} className="header__link">
          {title}
        </Link>
      </div>
    </header>
  );
}

export default Header;

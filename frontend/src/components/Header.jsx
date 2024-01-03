import logo from '../images/header__logo.svg';
import {Link, useLocation} from "react-router-dom";

function Header({loggedIn, email, onLogout}) {

  const location = useLocation()

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место Россия"/>
      <p className="header__user">{email || ''}</p>
      {loggedIn && <button className="header__button" onClick={onLogout}>Выйти</button>}
      {location.pathname.includes('sign-in') && <Link to='/sign-up' className="header__button">Зарегистрироваться</Link>}
      {location.pathname.includes('sign-up') && <Link to='/sign-in' className="header__button">Войти</Link>}
    </header>
  )
}

export default Header

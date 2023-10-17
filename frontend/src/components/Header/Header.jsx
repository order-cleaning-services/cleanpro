import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import signin from '../../assets/images/signin.svg'
import profile from '../../assets/images/profile.svg'
import './Header.scss'
import { ROUTES } from '../../constants/constants'
import { useSelector } from 'react-redux'
import { authSelectors } from '../../store/auth/authSelectors'

const Header = () => {
  const location = useLocation()
  const isAuth = useSelector(authSelectors.getIsAuth)

  return (
    <header className="header">
      <nav className="header__menu">
        <Logo />
        <ul className="header__links">
          <li>
            <Link className={`header__link${location.pathname === ROUTES.HOME ? '-active' : ''}`} to="/">
              Уборка
            </Link>
          </li>
          <li>
            <Link className={`header__link${location.pathname === ROUTES.ABOUT ? '-active' : ''}`} to="/about">
              О компании
            </Link>
          </li>
        </ul>
        <div className="header__info">
          <p className="header__phone">+7 (495) 783-99-00</p>
          {isAuth ? (
            <Link className="header__profile" to="/profile">
              <img src={profile} className="header__profile-icon" alt="Иконка профиля" />
              Профиль
            </Link>
          ) : (
            <Link className="header__signin" to="/signin">
              <img src={signin} className="header__signin-icon" alt="Иконка авторизации" />
              Войти
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header

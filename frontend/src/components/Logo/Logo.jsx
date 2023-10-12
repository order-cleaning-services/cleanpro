import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import('./Logo.scss')

const Logo = () => {
  return (
    <Link className="logo-link " to="/">
      <img src={logo} className="logo-link__img" alt="Логотип" />
    </Link>
  )
}

export default Logo

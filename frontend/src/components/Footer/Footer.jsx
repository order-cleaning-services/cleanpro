import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCleanType } from '../../store/calculator/calculatorSlice'
import FooterLinksToAboutPage from '../FooterLinksToAboutPage/FooterLinksToAboutPage'
import FooterLinksToHomePage from '../FooterLinksToHomePage/FooterLinksToHomePage'
import FooterLinksToTabs from '../FooterLinksToTabs/FooterLinksToTabs'
import Logo from '../Logo/Logo'
import './Footer.scss'

const Footer = () => {
  const location = useLocation()
  const aboutElementId = 'about'
  const cleanersElementId = 'cleaners'
  const commentsElementId = 'comments'
  const faqElementId = 'faq'
  const tabsElementId = 'calculator'
  const dispatch = useDispatch()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-wrapper">
          <Logo />
        </div>
        <div className="footer__column">
          <h4 className="footer__title text-l">Уборка</h4>
          {location.pathname === '/about' ? (
            <div className="footer__column">
              <Link onClick={() => dispatch(setCleanType(1))} to={`/#${tabsElementId}`} className="footer__link">
                Поддерживающая
              </Link>
              <Link onClick={() => dispatch(setCleanType(2))} to={`/#${tabsElementId}`} className="footer__link">
                Генеральная
              </Link>
              <Link onClick={() => dispatch(setCleanType(3))} to={`/#${tabsElementId}`} className="footer__link">
                После ремонта
              </Link>
              <Link onClick={() => dispatch(setCleanType(4))} to={`/#${tabsElementId}`} className="footer__link">
                После праздника
              </Link>
              <Link onClick={() => dispatch(setCleanType(5))} to={`/#${tabsElementId}`} className="footer__link">
                Мытье окон
              </Link>
            </div>
          ) : (
            <FooterLinksToTabs />
          )}
        </div>
        <div className="footer__column">
          <h4 className="footer__title  text-l">Компания</h4>
          {location.pathname === '/' ? (
            <>
              <Link to={`/about#${aboutElementId}`} className="footer__link">
                О компании
              </Link>
              <Link to={`/about#${cleanersElementId}`} className="footer__link">
                Клинеры
              </Link>
            </>
          ) : (
            <FooterLinksToAboutPage />
          )}
          {location.pathname === '/about' ? (
            <>
              <Link to={`/#${commentsElementId}`} className="footer__link">
                Отзывы
              </Link>
              <Link to={`/#${faqElementId}`} className="footer__link">
                Частые вопросы
              </Link>
            </>
          ) : (
            <FooterLinksToHomePage />
          )}
        </div>
        <div className="footer__column">
          <h4 className="footer__title text-l">Контакты</h4>
          <p className="footer__link">+7 (495) 783-99-00</p>
        </div>
        <div></div>
      </div>
    </footer>
  )
}

export default Footer

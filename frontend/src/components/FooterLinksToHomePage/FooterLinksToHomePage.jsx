import { Link } from 'react-scroll'

function FooterLinksToHomePage() {
  return (
    <>
      <Link smooth={true} duration={500} className="footer__link" to="comments">
        Отзывы
      </Link>
      <Link smooth={true} duration={400} className="footer__link" to="faq">
        Частые вопросы
      </Link>
    </>
  )
}

export default FooterLinksToHomePage

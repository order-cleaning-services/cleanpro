import { Link } from 'react-scroll'

function FooterLinksToAboutPage() {
  return (
    <>
      <Link smooth={true} duration={400} className="footer__link" to="about">
        О компании
      </Link>
      <Link smooth={true} duration={400} className="footer__link" to="cleaners">
        Клинеры
      </Link>
    </>
  )
}

export default FooterLinksToAboutPage

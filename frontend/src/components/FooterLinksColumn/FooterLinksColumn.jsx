const FooterLinksColumn = ({ title, links }) => {
  return (
    <div className="footer-links-column">
      <h2 className="footer-links-column__title">{title}</h2>
      <ul className="footer-links-column__list">
        {links.map((link, index) => (
          <li key={index}>
            <a className="footer-links__link" href={link.url}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterLinksColumn

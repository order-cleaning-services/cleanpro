import './FooterList.scss'

const FooterList = ({ items }) => {
  return (
    <>
      {items.length > 1 ? (
        <ul className="footer-list">
          {items.map(link => (
            <li key={link.name}>
              <a className="footer-item" href={link.url}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <>
          {items.map(item => (
            <p className="footer-item" key={item}>
              {item.name}
            </p>
          ))}
        </>
      )}
    </>
  )
}

export default FooterList

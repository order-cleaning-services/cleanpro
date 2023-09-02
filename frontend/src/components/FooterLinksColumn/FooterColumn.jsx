import FooterLinks from '../FooterLinks/FooterList'
import './FooterColumn.scss'

const FooterColumn = ({ heading, items }) => {
  return (
    <div className="footer-links">
      <h2 className="footer-links__heading">{heading}</h2>
      <FooterLinks items={items} />
    </div>
  )
}

export default FooterColumn

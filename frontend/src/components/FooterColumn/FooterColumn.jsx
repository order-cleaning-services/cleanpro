import FooterList from '../FooterList/FooterList'
import './FooterColumn.scss'

const FooterColumn = ({ heading, items }) => {
  return (
    <div className="footer-links">
      <h2 className="footer-links__heading">{heading}</h2>
      <FooterList items={items} />
    </div>
  )
}

export default FooterColumn

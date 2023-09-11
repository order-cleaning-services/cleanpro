import FooterList from '../FooterList/FooterList'
import './FooterColumn.scss'

const FooterColumn = ({ heading, items }) => {
  return (
    <div className="footer-links">
      <p className="text-l-bold">{heading}</p>
      <FooterList items={items} />
    </div>
  )
}

export default FooterColumn

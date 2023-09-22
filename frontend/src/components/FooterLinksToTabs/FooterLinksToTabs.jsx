import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCleanType } from '../../store/calculator/calculatorSlice'

function FooterLinksToTabs() {
  const dispatch = useDispatch()
  const tabsElementId = 'calculator'

  return (
    <>
      <div className="footer__column">
        <Link onClick={() => dispatch(setCleanType(1))} className="footer__link" to={`/#${tabsElementId}`}>
          Поддерживающая
        </Link>
        <Link onClick={() => dispatch(setCleanType(2))} className="footer__link" to={`/#${tabsElementId}`}>
          Генеральная
        </Link>
        <Link onClick={() => dispatch(setCleanType(3))} className="footer__link" to={`/#${tabsElementId}`}>
          После ремонта
        </Link>
        <Link onClick={() => dispatch(setCleanType(4))} className="footer__link" to={`/#${tabsElementId}`}>
          После праздника
        </Link>
        <Link onClick={() => dispatch(setCleanType(5))} className="footer__link" to={`/#${tabsElementId}`}>
          Мытье окон
        </Link>
      </div>
    </>
  )
}

export default FooterLinksToTabs

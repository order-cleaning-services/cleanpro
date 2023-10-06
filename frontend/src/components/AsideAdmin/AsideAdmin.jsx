import './AsideAdmin.scss'
import { adminSelectors } from '../../store/admin/adminSelectors'
import { useDispatch, useSelector } from 'react-redux'
import {
  handleClickOrders,
  handleClickServices,
  handleClickStaff,
  handleClickStatistics,
} from '../../store/admin/adminSlice'

function AsideAdmin() {
  const getAdminNavLink = useSelector(adminSelectors.getAdminNavLink)
  const dispatch = useDispatch()

  return (
    <aside className="aside">
      <ul className="aside__items text-l">
        <li
          onClick={() => dispatch(handleClickOrders())}
          className={`aside__item ${getAdminNavLink === 'orders' ? 'active-link' : ''}`}>
          Заказы
        </li>
        <li
          onClick={() => dispatch(handleClickServices())}
          className={`aside__item ${getAdminNavLink === 'services' ? 'active-link' : ''}`}>
          Услуги
        </li>
        <li
          onClick={() => dispatch(handleClickStaff())}
          className={`aside__item ${getAdminNavLink === 'staff' ? 'active-link' : ''}`}>
          Персонал
        </li>
        <li
          onClick={() => dispatch(handleClickStatistics())}
          className={`aside__item ${getAdminNavLink === 'statistics' ? 'active-link' : ''}`}>
          Статистика
        </li>
      </ul>
    </aside>
  )
}

export default AsideAdmin

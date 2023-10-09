import '../GridAdmin/GridAdmin.scss'
import './TableTitle.scss'

import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'

function TableTitle() {
  const viewlink = useSelector(adminSelectors.getAdminNavLink)
  const viewTab = useSelector(adminSelectors.getAdminTab)

  return (
    <div className={`table-title ${viewlink === 'statistics' ? 'visible-table-element' : ''}  grid`}>
      <p className="grid__item">Оформлен</p>
      <p className="grid__item">№ заказа</p>
      <p className="grid__item">Вид услуги</p>
      <p className="grid__item">Время уборки</p>
      <p className="grid__item">Стоимость</p>
      <p className="grid__item">Клинер</p>
      {viewTab === 'completed' ? <p className="grid__item">Завершен</p> : null}
      {viewTab === 'cancelled' ? <p className="grid__item">Отменен</p> : null}
    </div>
  )
}

export default TableTitle

import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'

import '../GridAdmin/GridAdmin.scss'
import './TableTitle.scss'

function TableTitle() {
  const viewlink = useSelector(adminSelectors.getAdminNavLink)
  const viewTab = useSelector(adminSelectors.getAdminTab)

  return (
    <div className={`table-title ${viewlink === 'statistics' ? 'visible-table-element' : ''}  grid`}>
      <p className="grid__item">Оформлен</p>
      <p className="grid__item">№ заказа</p>
      <p className="grid__item">Вид услуги</p>
      {viewTab === 'new' || viewTab === 'completed' || viewTab === 'cancelled' ? (
        <p className="grid__item">Время уборки</p>
      ) : (
        ''
      )}
      {viewTab === 'current' ? <p className="grid__item">Дата, время</p> : ''}

      <p className="grid__item">Стоимость</p>
      {viewTab === 'completed' ? <p className="grid__item">Завершен</p> : ''}
      {viewTab === 'cancelled' ? <p className="grid__item">Отменен</p> : ''}
    </div>
  )
}

export default TableTitle

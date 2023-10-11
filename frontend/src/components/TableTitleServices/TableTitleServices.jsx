import '../GridAdmin/GridAdmin.scss'

import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'

function TableTitleServices() {
  const viewlink = useSelector(adminSelectors.getAdminNavLink)

  return (
    <div className={`table-title-services ${viewlink === 'services' ? '' : 'visible-table-element'} grid-services`}>
      <p className="grid-services__item">Название</p>
      <p className="grid-services__item">Тип</p>
      <p className="grid-services__item">Стоимость</p>
      <p className="grid-services__item">Единица</p>
      <p className="grid-services__item">Время,мин</p>
      <p className="grid-services__item">Фото</p>
    </div>
  )
}

export default TableTitleServices

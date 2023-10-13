import './CardOrder.scss'

import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'

import AdditionalInfoAdmin from '../AdditionalInfoAdmin/AdditionalinfoAdmin'

function CardOrder() {
  const viewTab = useSelector(adminSelectors.getAdminTab)
  const viewExtra = useSelector(adminSelectors.getStatusExtra)
  return (
    <div className="wrapper">
      <div className="card-order grid">
        <p className="grid__item text-s">
          23.09.2023
          <br />
          09:15
        </p>
        <p className="grid__item text-m-bold">#145639000</p>
        <p className="grid__item text-m-bold">Генеральная</p>
        <p className="grid__item text-m-bold">
          23.09.2023
          <br />
          12:00 - 15:00
        </p>
        <p className="grid__item text-m-bold">5900</p>
        <p className="grid__item text-m-bold">Маргарита Киселева</p>
        <div className="grid__item text-m-bold card-order__complete">
          {viewTab === 'new' && (
            <>
              <button className="card-order__button text-m-bold">Принять</button>
              <div className="card-order__close">+</div>
            </>
          )}

          {viewTab === 'current' && (
            <>
              <button className="card-order__button text-m-bold">Завершить</button>
              <div className="card-order__close">+</div>
            </>
          )}
          {viewTab === 'completed' && (
            <>
              <p className="text-m-bold">
                23.09.2023
                <br />
                10:00
              </p>
            </>
          )}
          {viewTab === 'cancelled' && (
            <div className="card-order__cancelled-comment">
              <p className="text-m-bold">
                23.09.2023
                <br />
                10:00
              </p>
              <p className="card-order__comment text-s">Не могу изменить информацию о заказе</p>
            </div>
          )}
        </div>
        {!viewExtra && <AdditionalInfoAdmin />}
      </div>
    </div>
  )
}

export default CardOrder

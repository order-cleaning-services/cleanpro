import './OrderCard.scss'
import date from '../../images/date.svg'
import address from '../../images/address.svg'
import user from '../../images/profile.svg'

const OrderCard = () => {
  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">Генеральная уборка</h2>
        <div className="card__header-info">
          <div className="card__status-led"></div>
          <p className="card__status-text">Оплачен</p>
          <p className="card__cost">5 900 ₽</p>
        </div>
      </div>
      <div className="card__content">
        <ul className="card__info-list">
          <li className="card__info-line">
            <img src={date} alt="Иконка календаря" />
            <p className="card__date-time">
              Ср, 20.09.2023 <span className="card__breaker">&#183;</span> 12:00-14:0
            </p>
          </li>
          <li className="card__info-line">
            <img src={address} alt="Иконка геопозиции" />
          </li>
          <li className="card__info-line">
            <img src={user} alt="Иконка геопозиции" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default OrderCard

import './OrderCard.scss'
import calendar from '../../images/date.svg'
import geo from '../../images/address.svg'
import user from '../../images/profile.svg'
import up from '../../images/chevron-up.svg'
import down from '../../images/chevron-down.svg'
import { useState } from 'react'

const OrderCard = () => {
  // Переменные из констант нужно будет переписать в аргументы, получаемые на рендер компонентом

  const CLEANERS = ['Климова Ольга', 'Плотников Евгений']
  const DATE = 'Ср, 20.09.2023'
  const TIME = '12:00-14:00'
  const ADDRESS = 'г. Москва, ул Дмитриевского, д.1, кв 5, подъезд 3, этаж 8'

  const [isDetailed, setIsDetailed] = useState(false)

  const toggleInfo = () => setIsDetailed(!isDetailed)

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
            <img className="card__info-line-image" src={calendar} alt="Иконка календаря" />
            <p className="card__info-line-text">
              {DATE} <span className="card__breaker">&#183;</span> {TIME}
            </p>
          </li>
          <li className="card__info-line">
            <img className="card__info-line-image" src={geo} alt="Иконка геопозиции" />
            <p className="card__info-line-text">{ADDRESS}</p>
          </li>
          <li className="card__info-line">
            <img className="card__info-line-image" src={user} alt="Иконка геопозиции" />
            <div className="card__info-line-cleaners">
              {CLEANERS.map(cleaner => (
                <p className="card__info-line-text" key={cleaner}>
                  {cleaner}
                </p>
              ))}
            </div>
          </li>
        </ul>
        <div className="card__control">
          {isDetailed ? (
            <button className="card__control-btn card__control-btn_more" onClick={toggleInfo}>
              <img src={up} alt="Стрелка, направленная вверх" />
              Скрыть
            </button>
          ) : (
            <button className="card__control-btn card__control-btn_more" onClick={toggleInfo}>
              <img src={down} alt="Стрелка, направленная вниз" />
              Посмотреть подробнее
            </button>
          )}
          <div className="card__control-buttons">
            <button className="card__control-btn">Перенести</button>
            <button className="card__control-btn">Отменить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard

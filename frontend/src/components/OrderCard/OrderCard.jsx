import { useState } from 'react'
import './OrderCard.scss'
import calendar from '../../images/date.svg'
import geo from '../../images/address.svg'
import user from '../../images/profile.svg'
import up from '../../images/chevron-up.svg'
import down from '../../images/chevron-down.svg'

const OrderCard = () => {
  const [isDetailed, setIsDetailed] = useState(false)
  const toggleInfo = () => setIsDetailed(!isDetailed)

  // Переменные из констант нужно будет переписать в аргументы, получаемые на рендер компонентом
  const isCompleted = false
  const CLEANERS = ['Климова Ольга', 'Плотников Евгений']
  const DATE = 'Ср, 20.09.2023'
  const TIME = '12:00-14:00'
  const ADDRESS = 'г. Москва, ул Дмитриевского, д.1, кв 5, подъезд 3, этаж 8'
  const OPTIONS = [
    'Уборка пылесосом',
    'Влажная уборка полов и плинтусов',
    'Удаление пыли с осветительных приборов',
    'Влажная уборка подоконников, радиаторов и труб',
    'Мойка зеркал и стеклянных поверхностей',
    'Влажная уборка мебели',
    'Удаление пыли с бытовой техники',
    'Вынос мусора',
    'Удаление пыли с дверных проёмов',
    'Удаление пыли с предметов интерьера',
    'Мойка дверных блоков',
    'Мойка мебели внутри, свободной от вещей',
    'Мытьё карнизов, кондиционеров, гардин',
    'Влажная очистка перегородок, антресолей',
  ]
  const EXTRA_OPTIONS = []

  return (
    <div className={`card ${isCompleted ? 'card_completed' : ''}`}>
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
          {isCompleted ? (
            <div className="card__control-buttons">
              <button className="card__control-btn">Оценить</button>
              <button className="card__control-btn">Повторить заказ</button>
            </div>
          ) : (
            <div className="card__control-buttons">
              <button className="card__control-btn">Перенести</button>
              <button className="card__control-btn">Отменить</button>
            </div>
          )}
        </div>
        {isDetailed && (
          <div className="card__options">
            <h2 className="card__title">Услуги</h2>
            <div className="card__options-container">
              <div className="card__options-column">
                <h3 className="card__options-title">Основные</h3>
                <ul className="card__options-list">
                  {OPTIONS.map(option => {
                    return (
                      <li className="card__options-item" key={option}>
                        {option}
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="card__options-column">
                <h3 className="card__options-title">Дополнительные</h3>
                {EXTRA_OPTIONS.length > 0 ? (
                  <ul className="card__options-list">
                    {EXTRA_OPTIONS.map(option => {
                      return (
                        <li className="card__options-item" key={option}>
                          {option}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="card__options-item">Нет дополнительных услуг</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderCard

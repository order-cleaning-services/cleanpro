import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './OrderCard.scss'
import calendar from '../../assets/images/date.svg'
import geo from '../../assets/images/address.svg'
import user from '../../assets/images/profile.svg'
import up from '../../assets/images/chevron-up.svg'
import down from '../../assets/images/chevron-down.svg'
import TransferModal from '../Modal/TransferModal/TransferModal'
import CancelModal from '../Modal/CancelModal/CancelModal'
import ReviewModal from '../Modal/ReviewModal/ReviewModal'
import { HashLink } from 'react-router-hash-link'
import { getOrderById } from '../../store/order/orderActions'

const OrderCard = ({ order }) => {
  const { cleaning_date, cleaning_time, address, cleaning_type, services, total_sum, id, order_status } = order
  const [isDetailed, setIsDetailed] = useState(false)
  const toggleInfo = () => setIsDetailed(!isDetailed)
  const [showTransfer, setShowTransfer] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [showReview, setShowReview] = useState(false)

  const dispatch = useDispatch()

  const handleOnClick = () => {
    dispatch(getOrderById(id))
  }

  // Переменные из констант нужно будет переписать в аргументы, получаемые на рендер компонентом
  const isCompleted =
    order_status === 'created' || order_status === 'Создан' ? false : order_status === 'accepted' ? false : true
  const CLEANERS = ['Климова Ольга', 'Плотников Евгений']

  return (
    <div className={`card ${isCompleted ? 'card_completed' : ''}`}>
      <div className="card__header">
        <h2 className="card__title">{cleaning_type.title} уборка</h2>
        <div className="card__header-info">
          {order_status == 'finished' || order_status == 'cancelled' ? null : <div className="card__status-led"></div>}
          <p className="card__status-text">
            {order_status == 'created' || order_status === 'Создан'
              ? 'Оплачен'
              : order_status == 'accepted'
              ? 'Принят'
              : order_status == 'finished'
              ? 'Завершен'
              : 'Отменен'}
          </p>
          <p className="card__cost">{`${total_sum?.toString().slice(0, -3)} ${total_sum?.toString().slice(-3)}`} ₽</p>
        </div>
      </div>
      <div className="card__content">
        <ul className="card__info-list">
          <li className="card__info-line">
            <img className="card__info-line-image" src={calendar} alt="Иконка календаря" />
            <p className="card__info-line-text">
              {cleaning_date} <span className="card__breaker">&#183;</span> {cleaning_time.slice(0, -3)}
            </p>
          </li>
          <li className="card__info-line">
            <img className="card__info-line-image" src={geo} alt="Иконка геопозиции" />
            <p className="card__info-line-text">{`г. ${address.city}, ул ${address.street}, д.${address.house}, кв ${address.apartment}, подъезд ${address.entrance}, этаж ${address.floor}`}</p>
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
              <button onClick={() => setShowReview(s => !s)} className="card__control-btn">
                Оценить
              </button>
              <ReviewModal show={showReview} closeModal={() => setShowReview(false)} />
              <HashLink to="/#calculator" className="card__control-link">
                <button className="card__control-btn" onClick={handleOnClick}>
                  Повторить заказ
                </button>
              </HashLink>
            </div>
          ) : (
            <div className="card__control-buttons">
              <button onClick={() => setShowTransfer(s => !s)} className="card__control-btn">
                Перенести
              </button>
              <TransferModal order={order.id} show={showTransfer} closeModal={() => setShowTransfer(false)} />
              <button onClick={() => setShowCancel(s => !s)} className="card__control-btn">
                Отменить
              </button>
              <CancelModal order={order.id} show={showCancel} closeModal={() => setShowCancel(false)} />
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
                  {cleaning_type?.service?.map(option => {
                    return (
                      <li className="card__options-item" key={option.id}>
                        {option.title}
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="card__options-column">
                <h3 className="card__options-title">Дополнительные</h3>
                {services?.length > 0 ? (
                  <ul className="card__options-list">
                    {services?.map(service => {
                      return (
                        <li className="card__options-item" key={service.id}>
                          {service.title} x {service.amount}
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

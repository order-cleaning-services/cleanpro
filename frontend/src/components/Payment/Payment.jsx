import Total from '../Total/Total'
import './Payment.scss'
import left from '../../images/arr-left.svg'
import calend from '../../images/calendar.svg'
import geo from '../../images/geo.svg'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

const Payment = () => {
  let data = {
    date: undefined,
    time: undefined,
    city: undefined,
    street: undefined,
    d: undefined,
    k: undefined,
    p: undefined,
    l: undefined,
    name: undefined,
    email: undefined,
    phone: undefined,
    comment: undefined,
  }
  return (
    <section className="payment">
      <Link to="/" className="payment__back">
        <img src={left} alt="arrow back" />
        Назад
      </Link>
      <Total />
      <div className="payment__info">
        <div className="payment__info-wrapper">
          <img src={calend} alt="" />
          <p className="payment__text">
            {data.date || 'Ср, 20.09.2023'} • {data.time || '12:00-14:10'}
          </p>
        </div>
        <div className="payment__info-wrapper">
          <img src={geo} alt="" />
          <p className="payment__text"> г. Москва, ул Дмитриевского, д.1, кв 5, подъезд 3, этаж 8</p>
        </div>
        <p className="payment__text">Иван</p>
        <p className="payment__text">example@example.ru</p>
        <p className="payment__text">+7 (999) 999 99 99</p>
        <p className="payment__text">Комментарий: аллергия на концентраты</p>
      </div>

      <Button buttonClassName="button" buttonText="Оплатить" />
    </section>
  )
}

export default Payment

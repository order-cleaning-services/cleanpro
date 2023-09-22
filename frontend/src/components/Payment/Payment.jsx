import Total from '../Total/Total'
import './Payment.scss'
import left from '../../images/arr-left.svg'
import calend from '../../images/calendar.svg'
import geo from '../../images/geo.svg'
import Button from '../Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'
import { createOrder } from '../../store/order/orderActions'
import { ROUTES } from '../../constants/constants'

const Payment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const total = useSelector(calculatorSelectors.getTotal)
  const orderData = useSelector(calculatorSelectors.getOrderForm)
  const cleaningType = useSelector(calculatorSelectors.getCleanType)
  const extra = useSelector(calculatorSelectors.getExtras)

  function handleSubmit() {
    const services = extra.filter(item => item.amount > 0).map(item => ({ id: item.id, amount: item.amount }))
    const data = { ...orderData, total_sum: total, cleaning_type: cleaningType, services }
    dispatch(createOrder(data))
    navigate(ROUTES.profile)
  }

  return (
    <section className="payment">
      <Link to="/" className="payment__back">
        <img src={left} alt="arrow back" />
        Назад
      </Link>
      <Total total={`${total?.toString().slice(0, -3)} ${total?.toString().slice(-3)}`} />
      <div className="payment__info">
        <div className="payment__info-wrapper">
          <img src={calend} alt="" />
          <p className="payment__text">
            {orderData.cleaning_date} • {orderData.cleaning_time}
          </p>
        </div>
        <div className="payment__info-wrapper">
          <img src={geo} alt="" />
          <p className="payment__text">{` г. ${orderData.city}, ул ${orderData.street}, д.${orderData.house}, кв ${orderData.apartment}, подъезд ${orderData.entrance}, этаж ${orderData.floor}`}</p>
        </div>
        <p className="payment__text">{orderData.first_name}</p>
        <p className="payment__text">{orderData.email}</p>
        <p className="payment__text">{orderData.phone}</p>
        {orderData.comment && <p className="payment__text">Комментарий: {orderData.comment}</p>}
      </div>

      <Button buttonClassName="payment__button" buttonText="Оплатить" onClick={() => handleSubmit()} />
    </section>
  )
}

export default Payment

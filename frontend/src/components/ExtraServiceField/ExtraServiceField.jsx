import Counter from '../Counter/Counter'
import './ExtraServiceField.scss'
import { setExtra } from '../../store/calculator/calculatorSlice'

function ExtraServiceField({ title, price, maxCount = 9, index, measure, amount }) {
  return (
    <div className="extra-service-field">
      <p className="text-m">{title}</p>
      <p className="text-m text-grey">
        {price} ₽ / {measure}
      </p>
      <Counter min={0} max={maxCount} price={price} count={amount} setCount={setExtra} index={index} />
    </div>
  )
}

export default ExtraServiceField

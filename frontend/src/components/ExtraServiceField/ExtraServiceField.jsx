import Counter from '../Counter/Counter'
import './ExtraServiceField.scss'
import { useSelector } from 'react-redux'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'
import { setExtra } from '../../store/calculator/calculatorSlice'

function ExtraServiceField({ title, price, maxCount, index }) {
  const extra = useSelector(calculatorSelectors.getExtras)[index]
  return (
    <div className="extra-service-field">
      <p className="text-m">{title}</p>
      <p className="text-m text-grey">
        {price} ₽ / {title === 'Глажка' ? '30 мин' : 'шт.'}
      </p>
      <Counter min={0} max={maxCount} price={price} count={extra.amount} setCount={setExtra} index={index} />
    </div>
  )
}

export default ExtraServiceField

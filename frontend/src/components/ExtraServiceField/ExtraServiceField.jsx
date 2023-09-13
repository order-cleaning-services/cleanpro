import { useState } from 'react'
import Counter from '../Counter/Counter'
import './ExtraServiceField.scss'

function ExtraServiceField({ title, price, maxCount, setTotal }) {
  const [extra, setExtra] = useState(0)
  return (
    <div className="extra-service-field">
      <p className="text-m">{title}</p>
      <p className="text-m text-grey">
        {price} ₽ / {title === 'Глажка' ? '30 мин' : 'шт.'}
      </p>
      <Counter min={0} max={maxCount} price={price} count={extra} setCount={setExtra} setTotal={setTotal} />
    </div>
  )
}

export default ExtraServiceField

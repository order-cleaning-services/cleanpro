import { useSelector } from 'react-redux'
import './Total.scss'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'
import getTotalString from '../../utils/getTotalString'

function Total({ total }) {
  const rooms = useSelector(calculatorSelectors.getRooms)
  const toilets = useSelector(calculatorSelectors.getToilets)

  return (
    <div className="calculator-form__total">
      <p className="text-l-bold">{`Уборка квартиры с ${rooms} ${
        rooms === 1 ? 'жилой комнатой' : 'жилыми комнатами'
      } и ${toilets} ${toilets === 1 ? 'санузлом' : 'санузлами'}`}</p>
      <div className="total__wrapper">
        <h1 className="text-black">{`${total ? getTotalString(total) : 0} ₽`}</h1>
        <span className="text-l">≈ 2ч 10мин</span>
      </div>
    </div>
  )
}

export default Total

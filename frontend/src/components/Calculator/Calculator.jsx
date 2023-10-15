import './Calculator.scss'
import { useEffect } from 'react'
import OrderForm from '../OrderForm/OrderForm'
import Total from '../Total/Total'
import ExtraServices from '../ExtraServices/ExtraServices'
import IncludeServices from '../IncludeServices/IncludeServices'
import { useSelector, useDispatch } from 'react-redux'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'
import { resetRooms, setCleanType, setTotal } from '../../store/calculator/calculatorSlice'
import { initialState } from '../../store/calculator/initialState'
import CleaningTypesTabs from '../CleaningTypesTabs/CleaningTypesTabs'
import RoomsAmount from '../RoomsAmount/RoomsAmount'
import { orderSelectors } from '../../store/order/orderSelectors'

function Calculator() {
  const dispatch = useDispatch()

  const total = useSelector(calculatorSelectors.getTotal)
  const cleanType = useSelector(calculatorSelectors.getCleanType)
  const types = useSelector(calculatorSelectors.getTypes)
  const repeatedTotal = useSelector(orderSelectors.getRepeatedTotal)

  const isTypeWindow = types.filter(card => card.id === cleanType)[0]?.title === 'Окна'

  useEffect(() => {
    dispatch(
      setTotal(
        repeatedTotal
          ? repeatedTotal
          : types
          ? types.filter(card => card.id === cleanType)[0]?.price
          : initialState.total,
      ),
    )
  }, [cleanType, dispatch, types, repeatedTotal])

  function handleActiveType(id) {
    dispatch(setCleanType(id))
    dispatch(resetRooms())
  }

  function isActive(id) {
    return cleanType === id
  }

  return (
    <section id="calculator" className="calculator">
      <div className="calculator__container">
        <h2>Выберите тип уборки</h2>
        <div className="calculator__wrapper">
          <div className="calculator__cleaning-type-container">
            <CleaningTypesTabs types={types} isActive={isActive} onHandleActiveType={handleActiveType} />
            <RoomsAmount isTypeWindow={isTypeWindow} />
            <IncludeServices cleanType={cleanType} />
            {!isTypeWindow && <ExtraServices />}
          </div>
          <div className="calculator__form-wrapper">
            <Total total={total} />
            <OrderForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calculator

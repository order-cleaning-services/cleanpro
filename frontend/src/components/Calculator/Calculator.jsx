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

function Calculator() {
  const dispatch = useDispatch()

  const total = useSelector(calculatorSelectors.getTotal)
  const cleanType = useSelector(calculatorSelectors.getCleanType)
  const types = useSelector(calculatorSelectors.getTypes)

  const isTypeWindow = types.filter(card => card.id === cleanType)[0]?.title === 'Окна'

  useEffect(() => {
    dispatch(resetRooms())
    dispatch(setTotal(types ? types.filter(card => card.id === cleanType)[0]?.price : initialState.total))
  }, [cleanType, dispatch, types])

  function handleActiveType(id) {
    dispatch(setCleanType(id))
    dispatch(resetRooms())
  }

  function isActive(id) {
    return cleanType === id
  }

  return (
    <section id="calculator" className="calculator__container">
      <h2>Выберите тип уборки</h2>
      <div className="calculator__wrapper">
        <div className="cleaning-type__container">
          <CleaningTypesTabs types={types} isActive={isActive} onHandleActiveType={handleActiveType} />
          <RoomsAmount isTypeWindow={isTypeWindow} />
          <IncludeServices cleanType={cleanType} />
          {!isTypeWindow && <ExtraServices />}
        </div>
        <div className="calculator-form__wrapper">
          <Total total={total} />
          <OrderForm />
        </div>
      </div>
    </section>
  )
}

export default Calculator

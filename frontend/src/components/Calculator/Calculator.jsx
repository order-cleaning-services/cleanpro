import './Calculator.scss'
import Tab from '../Tab/Tab'
import Counter from '../Counter/Counter'
import { useEffect } from 'react'
import OrderForm from '../OrderForm/OrderForm'
import Total from '../Total/Total'
import ExtraServices from '../ExtraServices/ExtraServices'
import IncludeServices from '../IncludeServices/IncludeServices'
import { useSelector, useDispatch } from 'react-redux'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'
import {
  resetRooms,
  setCleanType,
  setRooms,
  setToilets,
  setTotal,
  setWindows,
  setIsPanoramic,
} from '../../store/calculator/calculatorSlice'

function Calculator() {
  const dispatch = useDispatch()

  const total = useSelector(calculatorSelectors.getTotal)
  const cleanType = useSelector(calculatorSelectors.getCleanType)
  const rooms = useSelector(calculatorSelectors.getRooms)
  const toilets = useSelector(calculatorSelectors.getToilets)
  const windows = useSelector(calculatorSelectors.getWindows)
  const types = useSelector(calculatorSelectors.getTypes)

  const isTypeWindow = types.filter(card => card.id === cleanType)[0]?.title === 'Окна'

  useEffect(() => {
    dispatch(resetRooms())
    dispatch(setTotal(types.filter(card => card.id === cleanType)[0]?.price))
  }, [cleanType, dispatch])

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
          <div className="cleaning-type__wrapper">
            <p className="text-l">Тип уборки</p>
            <div className="cleaning-type__tabs">
              {types.map(card => (
                <Tab key={card.title} onChangeType={() => handleActiveType(card.id)} isActive={isActive(card.id)}>
                  {card.title}
                </Tab>
              ))}
            </div>
          </div>
          <div className="rooms-quantity">
            {isTypeWindow ? (
              <>
                <div className="amount__container">
                  <p className="text-l">Количество окон</p>
                  <Counter count={windows} min={1} max={10} price={1500} setCount={setWindows} setTotal={setTotal} />
                </div>
                <div className="checkbox__wrapper">
                  <p className="text-l">Панорамные окна</p>
                  <input type="checkbox" onClick={() => dispatch(setIsPanoramic())} />
                </div>
              </>
            ) : (
              <>
                <div className="amount__container">
                  <p className="text-l">Количество комнат</p>
                  <Counter
                    count={rooms}
                    min={1}
                    max={5}
                    price={types[cleanType - 1]?.price}
                    setCount={setRooms}
                    setTotal={setTotal}
                  />
                </div>
                <div className="amount__container">
                  <p className="amount__title">Количество санузлов</p>
                  <Counter count={toilets} min={1} max={5} price={600} setCount={setToilets} setTotal={setTotal} />
                </div>
              </>
            )}
          </div>
          <IncludeServices cleanType={cleanType} />
          {!isTypeWindow && <ExtraServices />}
        </div>
        <div className="calculator-form__wrapper">
          <Total total={`${total?.toString().slice(0, -3)} ${total?.toString().slice(-3)}`} />
          <OrderForm />
        </div>
      </div>
    </section>
  )
}

export default Calculator

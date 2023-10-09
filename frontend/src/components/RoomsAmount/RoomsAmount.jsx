import { useDispatch, useSelector } from 'react-redux'
import './RoomsAmount.scss'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'
import Counter from '../Counter/Counter'
import { setIsPanoramic, setRooms, setToilets, setTotal, setWindows } from '../../store/calculator/calculatorSlice'

function RoomsAmount() {
  const dispatch = useDispatch()

  const cleanType = useSelector(calculatorSelectors.getCleanType)
  const types = useSelector(calculatorSelectors.getTypes)
  const rooms = useSelector(calculatorSelectors.getRooms)
  const toilets = useSelector(calculatorSelectors.getToilets)
  const windows = useSelector(calculatorSelectors.getWindows)

  const isTypeWindow = types.filter(card => card.id === cleanType)[0]?.title === 'Окна'

  return (
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
  )
}

export default RoomsAmount

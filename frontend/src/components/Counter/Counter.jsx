import { useDispatch } from 'react-redux'
import './Counter.scss'

function Counter({ count, min, max, price = 0, setCount, index }) {
  const dispatch = useDispatch()
  function handleDecrement() {
    if (count > min) {
      dispatch(setCount({ step: -1, price: -price, index: index }))
    }
  }

  function handleIncrement() {
    if (count < max) {
      dispatch(setCount({ step: 1, price: price, index: index }))
    }
  }
  return (
    <div className="counter__container">
      <button className="btn-decrement" onClick={handleDecrement}>
        −
      </button>
      <span>{count}</span>
      <button className="btn-increment" onClick={handleIncrement}>
        +
      </button>
    </div>
  )
}

export default Counter

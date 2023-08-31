import { useState } from "react"
import "./Counter.scss"

function Counter({ min, max }) {
  const [count, setCount] = useState(min)

  function handleDecrement() {
    count > min && setCount((prev) => prev - 1)
  }

  function handleIncrement() {
    count < max && setCount((prev) => prev + 1)
  }
  return (
    <div className="counter__container">
      <button className="btn-decrement" onClick={handleDecrement}>
        -
      </button>
      <span>{count}</span>
      <button className="btn-increment" onClick={handleIncrement}>
        +
      </button>
    </div>
  )
}

export default Counter

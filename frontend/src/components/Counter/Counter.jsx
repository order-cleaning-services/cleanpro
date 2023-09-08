import "./Counter.scss"

function Counter({ count, min, max, price = 0, setCount, setTotal }) {
  function handleDecrement() {
    if (count > min) {
      setCount((prev) => prev - 1)
      setTotal((prev) => prev - price)
    }
  }

  function handleIncrement() {
    if (count < max) {
      setCount((prev) => prev + 1)
      setTotal((prev) => prev + price)
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

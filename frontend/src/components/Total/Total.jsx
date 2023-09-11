import "./Total.scss"

function Total({ total }) {
  return (
    <div className="calculator-form__total">
      <p className="text-l-bold">
        Уборка квартиры с 1 жилой комнатой и 1 санузлом
      </p>
      <div className="total__wrapper">
        <h1 className="text-black">{`${total} ₽`}</h1>
        <span className="text-l">≈ 2ч 10мин</span>
      </div>
    </div>
  )
}

export default Total

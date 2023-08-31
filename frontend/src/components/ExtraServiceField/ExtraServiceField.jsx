import Counter from "../Counter/Counter"
import "./ExtraServiceField.scss"

function ExtraServiceField({ title, price, maxCount }) {
  return (
    <div className="extra-service-field">
      <p className="extra-service-field__title">{title}</p>
      <p className="extra-service-field__price">
        {price} ₽ / {title === "Глажка" ? "30 мин" : "шт."}
      </p>
      <Counter extra={true} min={0} max={maxCount} />
    </div>
  )
}

export default ExtraServiceField

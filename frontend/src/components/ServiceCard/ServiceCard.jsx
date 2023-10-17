import './ServiceCard.scss'

function ServiceCard({ content, img }) {
  return (
    <div className="service-card__container">
      <p className="text-m">{content}</p>
      {img && (
        <div className="service-card__img">
          <img src={img} alt={content} />
        </div>
      )}
    </div>
  )
}

export default ServiceCard

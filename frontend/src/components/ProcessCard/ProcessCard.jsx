import './ProcessCard.scss'

function ProcessCard({ title, content }) {
  return (
    <div className="process-card">
      <p className="process-card__title">{title}</p>
      <p className="process-card__text">{content}</p>
    </div>
  )
}

export default ProcessCard

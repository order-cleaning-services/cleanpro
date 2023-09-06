function ServiceCard({ img, content }) {
  return (
    <div className="service-card">
      <p>{content}</p>
      <img src={img} alt="Уборка" />
    </div>
  )
}

export default ServiceCard

import './CleanersListAdmin.scss'

function CleanersListAdmin({ name, phone, img, onClick }) {
  return (
    <div className="cleaners-list" onClick={onClick}>
      <img className="cleaners-list__image" src={img} alt="Фото клинера" />
      <div className="cleaners-list__wrapper">
        <p className="cleaners-list__name text-m">{name}</p>
        <p className="cleaners-list__phone text-s">{phone}</p>
      </div>
    </div>
  )
}

export default CleanersListAdmin

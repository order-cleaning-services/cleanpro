import BackLink from '../BackLink/BackLink'
import EditServiceAdmin from '../EditServiceAdmin/EditServiceAdmin'

function AddService({ onClick }) {
  function handleClick() {
    onClick()
  }

  return (
    <div className="add">
      <BackLink onClick={handleClick} />
      <EditServiceAdmin title="Поддерживающая" />
    </div>
  )
}

export default AddService

import '../Modal.scss'
import Button from '../../Button/Button'

function AdminModal({ onClick, title, back }) {
  function handleSubmit(e) {
    e.preventDefault
  }

  return (
    <div className="modal">
      <div onClick={onClick} className="modal__overlay"></div>
      <form onSubmit={handleSubmit} action="" className="modal__form">
        <h2 className="form-review form-review__title text-l">{title}</h2>
        <Button buttonText="Отменить" buttonClassName="button button__modal-indent" />
        <p onClick={onClick} className="modal__back">
          {back}
        </p>
      </form>
    </div>
  )
}

export default AdminModal

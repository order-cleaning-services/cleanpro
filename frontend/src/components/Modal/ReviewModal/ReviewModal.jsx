import TextArea from '../../TextArea/TextArea'
import Button from '../../Button/Button'
import ButtonClose from '../../ButtonClose/ButtonClose'
import StarRating from '../../StarRating/StarRating'
import './ReviewModal.scss'
import '../Modal.scss'
import { createPortal } from 'react-dom'

function ReviewModal({ show, closeModal }) {
  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    console.log(formJson)
  }
  if (!show) return null
  return (
    <>
      {createPortal(
        <div className="modal">
          <div onClick={closeModal} className="modal__overlay"></div>
          <form onSubmit={handleSubmit} action="" className="modal__form">
            <ButtonClose closeModal={closeModal} />
            <div className="modal__content">
              <h2 className="form-review form-review__title text-l">Как вы оцените проведенную уборку?</h2>
              <div className="form-review__star-rating">
                <StarRating test="test" />
              </div>
              <TextArea NameTextArea={'text'} placeHolder="Поделитесь своими впечатлениями" />

              <Button buttonText="Опубликовать" buttonClassName="button button__modal-indent" />
            </div>
          </form>
        </div>,
        document.getElementById('root'),
      )}
    </>
  )
}

export default ReviewModal

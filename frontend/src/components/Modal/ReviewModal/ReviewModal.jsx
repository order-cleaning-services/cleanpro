import TextArea from '../../TextArea/TextArea'
import Button from '../../Button/Button'
import ButtonClose from '../../ButtonClose/ButtonClose'
import StarRating from '../../StarRating/StarRating'
import './ReviewModal.scss'
import '../Modal.scss'

function ReviewModal() {
  return (
    <div className="modal">
      <div className="modal__overlay"></div>
      <form action="" className="modal__form">
        <ButtonClose />
        <div className="modal__content">
          <h2 className="form-review form-review__title text-l">Как вы оцените проведенную уборку?</h2>
          <div className="form-review__star-rating">
            <StarRating />
          </div>
          <TextArea placeHolder="Поделитесь своими впечатлениями" />

          <Button buttonText="Опубликовать" buttonClassName="button button__modal-indent" />
        </div>
      </form>
    </div>
  )
}

export default ReviewModal

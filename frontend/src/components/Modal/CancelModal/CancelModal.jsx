import './CancelModal.scss'
import '../Modal.scss'

import ButtonClose from '../../ButtonClose/ButtonClose'
import TextArea from '../../TextArea/TextArea'
import Button from '../../Button/Button'
import InputRadio from '../../InputRadio/InputRadio'

function CancelModal() {
  return (
    <div className="modal">
      <div className="modal__overlay"></div>
      <form action="" className="modal__form">
        <ButtonClose />
        <div className="modal__content">
          <h2 className="form-cancel__title">Ваша уборка отменена</h2>

          <InputRadio
            legend="Укажите причину отмены, это поможет улучшить наш сервис"
            className="form-cancel__legend text-m"
          />
          <TextArea placeHolder="Напишите вашу причину, если ее нет в списке" />

          <Button buttonText="Отправить" buttonClassName="button button__modal-indent" />
        </div>
      </form>
    </div>
  )
}

export default CancelModal

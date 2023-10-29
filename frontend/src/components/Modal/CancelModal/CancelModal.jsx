import './CancelModal.scss'
import '../Modal.scss'

import ButtonClose from '../../ButtonClose/ButtonClose'
import TextArea from '../../TextArea/TextArea'
import Button from '../../Button/Button'
import InputRadio from '../../InputRadio/InputRadio'
import { createPortal } from 'react-dom'

function CancelModal({ show, closeModal }) {
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
              <h2 className="form-cancel__title">Ваша уборка отменена</h2>

              <InputRadio
                legend="Укажите причину отмены, это поможет улучшить наш сервис"
                className="form-cancel__legend text-m"
              />
              <TextArea NameTextArea={'text'} placeHolder="Напишите вашу причину, если ее нет в списке" />

              <Button buttonText="Отправить" buttonClassName="button button__modal-indent" />
            </div>
          </form>
        </div>,
        document.getElementById('root'),
      )}
    </>
  )
}

export default CancelModal

import './CancelModal.scss'
import '../Modal.scss'

import ButtonClose from '../../ButtonClose/ButtonClose'
import TextArea from '../../TextArea/TextArea'
import Button from '../../Button/Button'
import InputRadio from '../../InputRadio/InputRadio'
import { createPortal } from 'react-dom'
import { getToken } from '../../../utils/tokenActions'
import { useDispatch } from 'react-redux'
import { getUserOrders } from '../../../store/order/orderActions'
import ordersAPI from '../../../api/ordersAPI'

function CancelModal({ order, show, closeModal }) {
  const dispatch = useDispatch()
  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    const token = getToken()
    ordersAPI.cancel(order, {
      body:{ "comment_cancel": formJson.text || formJson.reason},
     token:token
     } 
      )
      console.log(formJson)
      dispatch(getUserOrders())
      closeModal()
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

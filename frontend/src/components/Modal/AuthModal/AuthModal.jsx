import './AuthModal.scss'
import '../Modal.scss'

import Button from '../../Button/Button'
import ButtonClose from '../../ButtonClose/ButtonClose'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { calculatorSelectors } from '../../../store/calculator/calculatorSelectors'
import { createOrder } from '../../../store/order/orderActions'

const AuthModal = ({ show, closeModal, code, requestCode }) => {
  const [text, setText] = useState('')
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const orderData = useSelector(calculatorSelectors.getOrderForm)
  const cleaningType = useSelector(calculatorSelectors.getCleanType)
  const total = useSelector(calculatorSelectors.getTotal)
  const extra = useSelector(calculatorSelectors.getExtras)
  const rooms = useSelector(calculatorSelectors.getRooms)
  const toilets = useSelector(calculatorSelectors.getToilets)

  const repeatRequest = () => {
    const { email } = orderData.user
    requestCode(email)
  }
  const onClose = () => {
    setText('')
    setIsError(false)
    closeModal(false)
  }

  const handleInput = evt => {
    setIsError(false)
    setText(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    if (text === code) {
      const services = extra.filter(item => item.amount > 0).map(item => ({ id: item.id, amount: item.amount }))
      const data = {
        ...orderData,
        total_sum: total,
        cleaning_type: cleaningType,
        services,
        total_time: 3,
        rooms_number: rooms,
        bathrooms_number: toilets,
      }

      dispatch(createOrder(data))
      navigate(ROUTES.payment)
      onClose()
    } else {
      setIsError(true)
    }
  }

  if (!show) return null
  return (
    <>
      {createPortal(
        <div className="modal">
          <div onClick={onClose} className="modal__overlay"></div>
          <form onSubmit={handleSubmit} action="" className="modal__form form-auth">
            <ButtonClose closeModal={onClose} />
            <div className="modal__content modal__content_auth">
              <h2 className="form-auth__title">Мы отправили на вашу почту код-подтверждение, введите его ниже</h2>
              <input
                className={`form-auth__input ${isError ? 'form-auth__input_error' : ''}`}
                placeholder="Код-подтверждение"
                value={text}
                onChange={handleInput}
              />
              <span className={`form-auth__error ${isError ? 'form-auth__error_active' : ''}`}>Введите верный код</span>
              <Button
                type="submit"
                buttonClassName={`button button_type_auth-submit button_size_s ${isError ? 'button_disabled' : ''}`}
                onClick={handleSubmit}
                buttonText={'Подтвердить'}
                disable={isError}
              />
              <Button
                type="button"
                buttonClassName={'button button_type_auth  button_size_s'}
                onClick={repeatRequest}
                buttonText={'Направить код повторно'}
              />
              <Button
                type="button"
                buttonClassName={'button button_type_auth'}
                onClick={() => console.log('Привет поддержка')}
                buttonText={'Не приходит код? Обратиться в поддержку'}
              />
            </div>
          </form>
        </div>,
        document.getElementById('root'),
      )}
    </>
  )
}

export default AuthModal

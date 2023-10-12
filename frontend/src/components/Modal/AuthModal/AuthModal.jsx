import './AuthModal.scss'
import '../Modal.scss'

import Button from '../../Button/Button'
import ButtonClose from '../../ButtonClose/ButtonClose'
import { createPortal } from 'react-dom'

const AuthModal = ({ closeModal }) => {
  function handleSubmit(evt) {
    evt.preventDefault()
    const form = evt.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    console.log(formJson)
  }
  return (
    <>
      {createPortal(
        <div className="modal">
          <div onClick={closeModal} className="modal__overlay"></div>
          <form onSubmit={handleSubmit} action="" className="modal__form form-auth">
            <ButtonClose closeModal={closeModal} />
            <div className="modal__content modal__content_auth">
              <h2 className="form-auth__title">Мы отправили на вашу почту код-подтверждение, введите его ниже</h2>
              <input className="form-auth__input" placeholder="Код-подтверждение"></input>
              <Button buttonClassName={'button button_size-s'} onClick={handleSubmit} buttonText={'Подтвердить'} />
              <Button
                buttonClassName={'button button_auth button_size-s'}
                onClick={handleSubmit}
                buttonText={'Направить код повторно'}
              />
              <Button
                buttonClassName={'button button_auth'}
                onClick={handleSubmit}
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

import './UnitModal.scss'

import Button from '../../Button/Button'
import ButtonClose from '../../ButtonClose/ButtonClose'

function UnitModal({ title, onClick, onInputChange, onKeyPress }) {
  return (
    <div className="modal">
      <div onClick={onClick} className="modal__overlay"></div>
      <form action="" className="modal__form modal-unit">
        <ButtonClose closeModal={onClick} />
        <h2 className="modal-unit__title text-l">{title}</h2>
        <div className="modal-unit__input">
          <input
            onChange={e => onInputChange(e.target.value)}
            type="text"
            className="input-parameters__input input-parameters__modal-unit text-s"
          />
        </div>
        <div className="modal-unit__button">
          <Button
            id="unit-modal-btn"
            onClick={onClick}
            onKeyDown={onKeyPress}
            type="button"
            buttonText="Создать"
            buttonClassName="button"
          />
        </div>
      </form>
    </div>
  )
}

export default UnitModal

import './TransferModal.scss'
import '../Modal.scss'
import InputField from '../../InputField/InputField'
import Button from '../../Button/Button'
import ButtonClose from '../../ButtonClose/ButtonClose'
import arrowDownInput from '../../../images/arrow-down-input.svg'

function TransferModal() {
  return (
    <section className="modal">
      <div className="modal__overlay"></div>
      <form action="" className="modal__form">
        <ButtonClose />
        <div className="modal__content">
          <h2 className="form-transfer__title text-l">Выберите новую дату и время уборки</h2>
          <div className="form-transfer__input-container">
            <InputField size="small" focus label="Дата" placeholder="__/__/____" />
            <div className="form-transfer__input-date">
              <label>Время</label>
              <select required name="time-modal" className="time-selection time-selection__modal">
                <option className="option-time" value="0" hidden></option>
                {Array.from({ length: 8 }, (_, i) => i + 9).map(num => (
                  <option className="time-option" value={num} key={num}>
                    {num < 10 ? `0${num}` : num}:00
                  </option>
                ))}
              </select>
              <div className="overlay-arrow">
                <img className="overlay-arrow__img" src={arrowDownInput} alt="вниз" />
              </div>
            </div>
          </div>
          <Button buttonText="Перенести" buttonClassName="button button__modal-indent" />
        </div>
      </form>
    </section>
  )
}

export default TransferModal

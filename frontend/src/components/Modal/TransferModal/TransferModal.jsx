import './TransferModal.scss'
import '../Modal.scss'
import InputField from '../../InputField/InputField'
import SelectReact from '../../SelectReact/SelectReact'
import Button from '../../Button/Button'
import ButtonClose from '../../ButtonClose/ButtonClose'

function TransferModal() {
  return (
    <section className="modal">
      <div className="modal__overlay"></div>
      <form action="" className="modal__form">
        <ButtonClose />
        <div className="modal__content">
          <h2 className="form-transfer__title text-l">Выберите новую дату и время уборки</h2>
          <div className="form-transfer__input-container">
            <InputField classNameModal="form-transfer__date" size="small" focus label="Дата" placeholder="__/__/____" />
            <div className="form-transfer__select">
              <label>Время</label>
              <SelectReact />
            </div>
          </div>
          <Button buttonText="Перенести" buttonClassName="button button__modal-indent" />
        </div>
      </form>
    </section>
  )
}

export default TransferModal

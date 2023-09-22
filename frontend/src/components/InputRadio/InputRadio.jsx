import './InputRadio.scss'

function InputRadio({ legend, className }) {
  return (
    <div className="input-radio">
      <legend className={className}>{legend}</legend>
      <div className="input-radio__container">
        <div className="input-radio__item">
          <input className="input-radio__input" type="radio" id="input-radio1" name="contact" value="" />
          <label htmlFor="input-radio1">Изменились планы</label>
        </div>
        <div className="input-radio__item">
          <input className="input-radio__input" type="radio" id="input-radio2" name="contact" value="" />
          <label htmlFor="input-radio2">Сделали уборку сами</label>
        </div>
        <div className="input-radio__item">
          <input className="input-radio__input" type="radio" id="input-radio3" name="contact" value="" />
          <label htmlFor="input-radio3">Нашли другого клинера</label>
        </div>
        <div className="input-radio__item">
          <input className="input-radio__input" type="radio" id="input-radio4" name="contact" value="" />
          <label htmlFor="input-radio4">Никого не будет дома</label>
        </div>
        <div className="input-radio__item">
          <input className="input-radio__input" type="radio" id="input-radio5" name="contact" value="" />
          <label htmlFor="input-radio5">Не понравился клинер</label>
        </div>
        <div className="input-radio__item">
          <input className="input-radio__input" type="radio" id="input-radio6" name="contact" value="" />
          <label htmlFor="input-radio6">Не могу изменить информацию о заказе</label>
        </div>
        <div className="input-radio__item">
          <input className="input-radio__input" type="radio" id="input-radio7" name="contact" value="" />
          <label htmlFor="input-radio7">Нужен другой тип уборки</label>
        </div>
      </div>
    </div>
  )
}

export default InputRadio

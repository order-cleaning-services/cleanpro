import './InputRadio.scss'

function InputRadio({ legend, className }) {
  return (
    <div className="input-radio">
      <legend className={className}>{legend}</legend>
      <div className="input-radio__container">
        <div className="input-radio__item">
          <input className="input-radio__input" type="radio" id="input-radio1" name="reason" value="Изменились планы" />
          <label htmlFor="input-radio1">Изменились планы</label>
        </div>
        <div className="input-radio__item">
          <input
            className="input-radio__input"
            type="radio"
            id="input-radio2"
            name="reason"
            value="Сделали уборку сами"
          />
          <label htmlFor="input-radio2">Сделали уборку сами</label>
        </div>
        <div className="input-radio__item">
          <input
            className="input-radio__input"
            type="radio"
            id="input-radio3"
            name="reason"
            value="Нашли другого клинера"
          />
          <label htmlFor="input-radio3">Нашли другого клинера</label>
        </div>
        <div className="input-radio__item">
          <input
            className="input-radio__input"
            type="radio"
            id="input-radio4"
            name="reason"
            value="Никого не будет дома"
          />
          <label htmlFor="input-radio4">Никого не будет дома</label>
        </div>
        <div className="input-radio__item">
          <input
            className="input-radio__input"
            type="radio"
            id="input-radio5"
            name="reason"
            value="Не понравился клинер"
          />
          <label htmlFor="input-radio5">Не понравился клинер</label>
        </div>
        <div className="input-radio__item">
          <input
            className="input-radio__input"
            type="radio"
            id="input-radio6"
            name="reason"
            value="Не могу изменить информацию о заказе"
          />
          <label htmlFor="input-radio6">Не могу изменить информацию о заказе</label>
        </div>
        <div className="input-radio__item">
          <input
            className="input-radio__input"
            type="radio"
            id="input-radio7"
            name="reason"
            value="ужен другой тип уборки"
          />
          <label htmlFor="input-radio7">Нужен другой тип уборки</label>
        </div>
      </div>
    </div>
  )
}

export default InputRadio

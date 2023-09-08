import InputField from '../InputField/InputField'
import './OrderForm.scss'

function OrderForm() {
  return (
    <form>
      <InputField label="Имя" />
      <InputField label="E-mail" placeholder="example@example.ru" />
      <InputField label="Телефон" placeholder="+7 (999) 999-99-99" />
      <InputField label="Город" />
      <InputField label="Улица" />
      <div className="inputs_wrapper">
        <InputField size="small" label="Дом" />
        <InputField size="small" label="Квартира" />
        <InputField size="small" label="Подъезд" />
        <InputField size="small" label="Этаж" />
        <InputField size="small" focus label="Дата" placeholder="__/__/____" />
        <div>
          <label>Время</label>
          <select required name="time" className="time-selection">
            <option className="option-time" value="0" hidden></option>
            {Array.from({ length: 8 }, (_, i) => i + 9).map(num => (
              <option className="time-option" value={num} key={num}>
                {num < 10 ? `0${num}` : num}:00
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label>Комментарий</label>
        <textarea
          className="order-comment"
          placeholder="Комментарии к заказу (например, имеется аллергия на чистящие средства или необходимо забрать вещи из химчистки)"
        />
      </div>
      <button className="form-btn">Заказать</button>
      <p>Нажимая «Заказать», я даю согласие на Обработку персональных данных и Договор оферты</p>
    </form>
  )
}

export default OrderForm

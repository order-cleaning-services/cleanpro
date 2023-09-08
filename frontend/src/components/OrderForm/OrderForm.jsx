import Input from "../input/Input"
import "./OrderForm.scss"

function OrderForm() {
  return (
    <form>
      <Input label="Имя" />
      <Input label="E-mail" placeholder="example@example.ru" />
      <Input label="Телефон" placeholder="+7 (999) 999-99-99" />
      <Input label="Город" />
      <Input label="Улица" />
      <div className="inputs_wrapper">
        <Input size="small" label="Дом" />
        <Input size="small" label="Квартира" />
        <Input size="small" label="Подъезд" />
        <Input size="small" label="Этаж" />
        <Input size="small" focus label="Дата" placeholder="__/__/____" />
        <div>
          <label>Время</label>
          <select required name="time" className="time-selection">
            <option className="option-time" value="0" hidden></option>
            {Array.from({ length: 8 }, (_, i) => i + 9).map((num) => (
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
      <p>
        Нажимая «Заказать», я даю согласие на Обработку персональных данных и
        Договор оферты
      </p>
    </form>
  )
}

export default OrderForm

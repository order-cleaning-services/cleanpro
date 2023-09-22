import { useDispatch } from 'react-redux'
import InputField from '../InputField/InputField'
import './OrderForm.scss'
import { useForm } from 'react-hook-form'
import { safeOrderForm } from '../../store/calculator/calculatorSlice'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/constants'
import { timeOptions } from '../../utils/initialData'

function OrderForm() {
  const { register, handleSubmit } = useForm()
  const dispath = useDispatch()
  const navigate = useNavigate()
  const onSubmit = data => {
    dispath(safeOrderForm(data))
    navigate(ROUTES.payment)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField isValid label="Имя" {...register('first_name')} />
      <InputField isValid label="E-mail" placeholder="example@example.ru" {...register('email')} />
      <InputField isValid label="Телефон" placeholder="+7 (999) 999-99-99" {...register('phone')} />
      <InputField isValid label="Город" {...register('city')} />
      <InputField isValid label="Улица" {...register('street')} />
      <div className="inputs_wrapper">
        <InputField isValid size="small" label="Дом" {...register('house')} />
        <InputField isValid size="small" label="Квартира" {...register('apartment')} />
        <InputField isValid size="small" label="Подъезд" {...register('entrance')} />
        <InputField isValid size="small" label="Этаж" {...register('floor')} />
        <InputField isValid size="small" focus label="Дата" placeholder="__/__/____" {...register('cleaning_date')} />
        <div>
          <label>Время</label>
          <select required name="time" className="time-selection" {...register('cleaning_time')}>
            <option className="option-time" value="0" hidden></option>
            {timeOptions.map(num => (
              <option className="time-option" value={num} key={num}>
                {num}
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
          {...register('comment')}
        />
      </div>
      <button className="form-btn">Заказать</button>
      <p>Нажимая «Заказать», я даю согласие на Обработку персональных данных и Договор оферты</p>
    </form>
  )
}

export default OrderForm

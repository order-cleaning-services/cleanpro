import { useForm, useController } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputField from '../InputField/InputField'
import InputFieldDate from '../InputFieldDate/InputFieldDate'
import Select from 'react-select'
import { formOrderValidationSelectors } from '../../store/formOrderValidation/formOrderValidationSelectors'
import { safeOrderForm } from '../../store/calculator/calculatorSlice'
import { ROUTES } from '../../constants/constants'
import { customerStylesSelect } from '../../assets/styles/customerStylesSelect'
import { options } from '../../utils/initialData'
import './OrderForm.scss'
function OrderForm() {
  const stateDate = useSelector(formOrderValidationSelectors.getStateDate)
  const dispatch = useDispatch()
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  const required = 'Обязательное поле'
  const navigate = useNavigate()
  const onSubmit = data => {
    dispatch(safeOrderForm(data))
    navigate(ROUTES.payment)
    reset()
  }

  const { field } = useController({ name: 'cleaning_time', control })
  const { value: slotValue, onChange: timeOnChange, ...restTimeField } = field

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* -------------------------------------USERNAME--------------------------------- */}
      <div className="inputs_wrapper-field">
        <InputField
          isValid
          label="Имя"
          {...register('username', {
            required,
            maxLength: {
              value: 60,
              message: 'Максимум 60 символов',
            },
            pattern: {
              value: /^(?=.{1,60}$)[а-яёА-ЯЁ '-]+$/,
              message: 'Укажите ваше имя. Пример: Апполинарий Вальдемарович фон Спасо-Преображенский',
            },
          })}
        />
        {errors?.username && <span className="form-entry__error">{errors?.username?.message || 'Ошибка'}</span>}
      </div>
      {/* -------------------------------------EMAIL--------------------------------- */}
      <div className="inputs_wrapper-field">
        <InputField
          isValid
          type="email"
          id="input-email"
          label="E-mail"
          placeholder="example@example.ru"
          {...register('email', {
            required,
            maxLength: {
              value: 50,
              message: 'Максимум 50 символов',
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Укажите почту. Пример: example@example.ru',
            },
          })}
        />
        {errors?.email && <span className="form-entry__error">{errors?.email?.message || 'Ошибка'}</span>}
      </div>

      {/* -------------------------------------PHONE--------------------------------- */}
      <div className="inputs_wrapper-field">
        <InputField
          isValid
          type="tel"
          label="Телефон"
          placeholder="+7 (999) 999-99-99"
          {...register('phone', {
            required,
            pattern: /(\+7[-_()\s]+|\+7|8\s?[(]{0,1}[0-9]{3}[)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2})/,
          })}
        />
        {errors?.phone && <span className="form-entry__error">{errors?.phone?.message || 'Ошибка'}</span>}
      </div>

      {/* -------------------------------------ГОРОД--------------------------------- */}
      <div className="inputs_wrapper-field">
        <InputField placeholder="Москва" value="Москва" isValid label="Город" {...register('city', {})} />
        {errors?.city && <span className="form-entry__error">{errors?.city?.message || 'Ошибка'}</span>}
      </div>

      {/* -------------------------------------УЛИЦА--------------------------------- */}
      <div className="inputs_wrapper-field">
        <InputField
          isValid
          label="Улица"
          {...register('street', {
            required,
            maxLength: {
              value: 150,
              message: 'Максимум 150 символов',
            },
          })}
        />
        {errors?.street && <span className="form-entry__error">{errors?.street?.message || 'Ошибка'}</span>}
      </div>

      <div className="inputs_wrapper">
        {/* -------------------------------------ДОМ--------------------------------- */}
        <div className="inputs_wrapper-field">
          <InputField
            isValid
            size="small"
            label="Дом"
            {...register('house', {
              required,
              pattern: {
                value: /([\d]+[/]?[\d]?[А-Яа-яA-Za-z]?){1}/,
                message: 'Должна быть хоть бы одна  цифра',
              },
              maxLength: {
                value: 60,
                message: 'Максимум 60 символов',
              },
            })}
          />
          {errors?.house && <span className="form-entry__error">{errors?.house?.message || 'Ошибка'}</span>}
        </div>

        {/* -------------------------------------КВАРТИРА--------------------------------- */}
        <div className="inputs_wrapper-field">
          <InputField
            isValid
            type="number"
            size="small"
            label="Квартира"
            {...register('apartment', {
              required,
              max: {
                value: 99,
                message: 'Максимальное значение 99',
              },
              min: {
                value: 0,
                message: 'Минимальное значение 0',
              },
            })}
          />
          {errors?.apartment && <span className="form-entry__error">{errors?.apartment?.message || 'Ошибка'}</span>}
        </div>

        {/* -------------------------------------ПОДЪЕЗД--------------------------------- */}
        <div className="inputs_wrapper-field">
          <InputField
            isValid
            type="number"
            size="small"
            label="Подъезд"
            {...register('entrance', {
              required,
              max: {
                value: 99,
                message: 'Максимальное значение 99',
              },
              min: {
                value: 0,
                message: 'Минимальное значение 0',
              },
            })}
          />
          {errors?.entrance && <span className="form-entry__error">{errors?.entrance?.message || 'Ошибка'}</span>}
        </div>

        {/* -------------------------------------ЭТАЖ--------------------------------- */}
        <div className="inputs_wrapper-field">
          <InputField
            isValid
            size="small"
            label="Этаж"
            {...register('floor', {
              required,
              max: {
                value: 99,
                message: 'Максимальное значение 99',
              },
              min: {
                value: 0,
                message: 'Минимальное значение 0',
              },
            })}
          />
          {errors?.floor && <span className="form-entry__error">{errors?.floor?.message || 'Ошибка'}</span>}
        </div>

        {/* -------------------------------------ДАТА--------------------------------- */}
        <div className="inputs_wrapper-field">
          <InputFieldDate
            isValid
            size="small"
            focus
            label="Дата"
            placeholder="__/__/____"
            {...register('cleaning_date', {
              required,
            })}
          />
          {(errors?.cleaning_date || stateDate == false) && (
            <span className="form-entry__error">{errors?.cleaning_date?.message || 'Выберите корректную дату'}</span>
          )}
        </div>

        {/* -------------------------------------ВРЕМЯ--------------------------------- */}
        <div className="inputs_wrapper-field">
          <label>Время</label>
          <Select
            styles={customerStylesSelect}
            className="select-time select-time_style_border"
            classNamePrefix="select-time"
            ref={register('cleaning_time', {
              required,
            })}
            options={options}
            value={slotValue ? options.find(x => x.value === slotValue) : slotValue}
            onChange={option => timeOnChange(option ? option.value : option)}
            {...restTimeField}
          />
          {errors?.cleaning_time && (
            <span className="form-entry__error">{errors?.cleaning_time?.message || 'Ошибка'}</span>
          )}
        </div>
      </div>
      <div>
        <label>Комментарий</label>
        <textarea
          className="order-comment"
          placeholder="Комментарии к заказу (например, имеется аллергия на чистящие средства или необходимо забрать вещи из химчистки)"
          {...register('comment', {
            maxLength: {
              value: 250,
              message: 'Максимум 250 символов',
            },
          })}
        />
        {errors?.comment && <span className="form-entry__error">{errors?.comment?.message || 'Ошибка'}</span>}
      </div>
      <button type="submit" className="form-btn">
        Заказать
      </button>
      <p>Нажимая «Заказать», я даю согласие на Обработку персональных данных и Договор оферты</p>
    </form>
  )
}

export default OrderForm

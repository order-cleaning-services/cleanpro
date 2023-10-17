import { useForm, useController } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import InputField from '../InputField/InputField'
import InputFieldDate from '../InputFieldDate/InputFieldDate'
import Select from 'react-select'
import { formOrderValidationSelectors } from '../../store/formOrderValidation/formOrderValidationSelectors'
import { safeOrderForm } from '../../store/calculator/calculatorSlice'
import { ROUTES, TIME_OPTIONS } from '../../constants/constants'
import { customerStylesSelect } from '../../assets/styles/customerStylesSelect'
import './OrderForm.scss'
import { orderSelectors } from '../../store/order/orderSelectors'
import { authSelectors } from '../../store/auth/authSelectors'
import { useEffect, useState } from 'react'
import { resetRepeatedOrder } from '../../store/order/orderSlice'
import FetchAPI from '../../utils/fetchAPI'
import AuthModal from '../Modal/AuthModal/AuthModal'
import { useNavigate } from 'react-router-dom'
import { PATTERNS } from '../../utils/validation'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'
import { createOrder } from '../../store/order/orderActions'

function OrderForm() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [code, setCode] = useState('')

  const stateDate = useSelector(formOrderValidationSelectors.getStateDate)
  const userData = useSelector(authSelectors.getUser)
  const repeatedOrder = useSelector(orderSelectors.getRepeatedOrder)
  const types = useSelector(calculatorSelectors.getTypes)
  const isAuth = useSelector(authSelectors.getIsAuth)
  const cleaningType = useSelector(calculatorSelectors.getCleanType)
  const total = useSelector(calculatorSelectors.getTotal)
  const extra = useSelector(calculatorSelectors.getExtras)
  const rooms = useSelector(calculatorSelectors.getRooms)
  const toilets = useSelector(calculatorSelectors.getToilets)

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

  const requestCode = async email => {
    try {
      const resCode = await FetchAPI.post('/users/confirm_email/', { body: { email } })
      return resCode
    } catch (err) {
      console.log(err.message)
    }
  }

  const openConfirmEmail = async email => {
    try {
      const fetchCode = await requestCode(email)
      console.log(fetchCode)
      setCode(fetchCode.confirm_code)
      setShowAuthModal(true)
    } catch (err) {
      console.log(err.message)
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (repeatedOrder) dispatch(resetRepeatedOrder())
    }
  }, [repeatedOrder, dispatch, types])

  const onSubmit = data => {
    const {
      username,
      email,
      phone,
      city,
      street,
      house,
      apartment,
      entrance,
      floor,
      cleaning_date,
      cleaning_time,
      comment,
    } = data
    const body = {
      user: { username, email, phone },
      address: { city, street, house, apartment, entrance, floor },
      total_time: 3,
      cleaning_date,
      cleaning_time,
      comment,
    }

    dispatch(safeOrderForm(body))

    if (isAuth) {
      const services = extra.filter(item => item.amount > 0).map(item => ({ id: item.id, amount: item.amount }))
      const data = {
        ...body,
        total_sum: total,
        cleaning_type: cleaningType,
        services,
        total_time: 3,
        rooms_number: rooms,
        bathrooms_number: toilets,
      }
      dispatch(createOrder(data))
      navigate(ROUTES.PAYMENT)
    } else {
      setShowAuthModal(true)
      openConfirmEmail(email)
    }

    reset()
  }

  const { field } = useController({ name: 'cleaning_time', control })
  const { value: slotValue, onChange: timeOnChange, ...restTimeField } = field

  return (
    <>
      <AuthModal show={showAuthModal} closeModal={setShowAuthModal} code={code} requestCode={requestCode} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* -------------------------------------USERNAME--------------------------------- */}
        <div className="inputs_wrapper-field">
          <InputField
            isValid
            readOnly={!!userData?.username}
            label="Имя"
            value={userData?.username || ''}
            {...register('username', {
              minLength: 2,
              maxLength: {
                value: 60,
                message: 'Максимум 60 символов',
              },
              pattern: PATTERNS.USERNAME,
            })}
            error={errors?.username}
          />
        </div>
        {/* -------------------------------------EMAIL--------------------------------- */}
        <div className="inputs_wrapper-field">
          <InputField
            isValid
            readOnly={!!userData?.email}
            type="email"
            id="input-email"
            label="E-mail"
            placeholder="example@example.ru"
            value={userData?.email || ''}
            {...register('email', {
              minLength: 5,
              maxLength: {
                value: 50,
                message: 'Максимум 50 символов',
              },
              pattern: PATTERNS.EMAIL,
            })}
            error={errors?.email}
          />
        </div>

        {/* -------------------------------------PHONE--------------------------------- */}
        <div className="inputs_wrapper-field">
          <InputField
            isValid
            readOnly={!!userData?.phone}
            type="tel"
            label="Телефон"
            placeholder="+7 (999) 999-99-99"
            value={userData?.phone || ''}
            {...register('phone', {
              minLength: 10,
              pattern: PATTERNS.PHONE,
            })}
            error={errors?.phone}
          />
        </div>

        {/* -------------------------------------ГОРОД--------------------------------- */}
        <div className="inputs_wrapper-field">
          <InputField
            isValid
            readOnly
            placeholder="Москва"
            value="Москва"
            label="Город"
            {...register('city', {})}
            error={errors?.city}
          />
        </div>
        {/* -------------------------------------УЛИЦА--------------------------------- */}
        <div className="inputs_wrapper-field">
          <InputField
            isValid
            label="Улица"
            value={repeatedOrder?.address?.street || userData?.address?.street || ''}
            {...register('street', {
              required,
              maxLength: {
                value: 150,
                message: 'Максимум 150 символов',
              },
            })}
            error={errors?.street}
          />
        </div>
        <div className="inputs_wrapper">
          {/* -------------------------------------ДОМ--------------------------------- */}
          <div className="inputs_wrapper-field">
            <InputField
              isValid
              size="small"
              label="Дом"
              value={repeatedOrder?.address?.house || userData?.address?.house || ''}
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
              error={errors?.house}
            />
          </div>
          {/* -------------------------------------КВАРТИРА--------------------------------- */}
          <div className="inputs_wrapper-field">
            <InputField
              isValid
              type="number"
              size="small"
              label="Квартира"
              value={repeatedOrder?.address?.apartment || userData?.address?.apartment || ''}
              {...register('apartment', {
                required,
                max: {
                  value: 9999,
                  message: 'Максимальное значение 9999',
                },
                min: {
                  value: 0,
                  message: 'Минимальное значение 0',
                },
              })}
              error={errors?.apartment}
            />
          </div>
          {/* -------------------------------------ПОДЪЕЗД--------------------------------- */}
          <div className="inputs_wrapper-field">
            <InputField
              isValid
              type="number"
              size="small"
              label="Подъезд"
              value={repeatedOrder?.address?.entrance || userData?.address?.entrance || ''}
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
              error={errors?.entrance}
            />
          </div>
          {/* -------------------------------------ЭТАЖ--------------------------------- */}
          <div className="inputs_wrapper-field">
            <InputField
              isValid
              size="small"
              label="Этаж"
              value={repeatedOrder?.address?.floor || userData?.address?.floor || ''}
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
              error={errors?.floor}
            />
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
              options={TIME_OPTIONS}
              value={slotValue ? TIME_OPTIONS.find(x => x.value === slotValue) : slotValue}
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
    </>
  )
}

export default OrderForm

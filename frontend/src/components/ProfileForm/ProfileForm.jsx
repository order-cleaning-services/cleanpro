import { useForm } from 'react-hook-form'
import Button from '../Button/Button'
import InputField from '../InputField/InputField'
import './ProfileForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { authSelectors } from '../../store/auth/authSelectors'
import { updateUser } from '../../store/auth/authActions'

const ProfileForm = () => {
  const userData = useSelector(authSelectors.getUser)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: userData?.username || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      city: userData?.address?.city || 'Москва',
      street: userData?.address?.street || '',
      house: userData?.address?.house || '',
      apartment: userData?.address?.apartment || '',
      floor: userData?.address?.floor || '',
      entrance: userData?.address?.entrance || '',
    },
  })

  function onSubmit(data) {
    const { city, street, house, apartment, floor, entrance, ...rest } = data
    const body = { address: { city, street, house, apartment, floor, entrance }, ...rest }
    dispatch(updateUser(body))
  }

  function onError(errors) {
    console.log(errors)
  }

  return (
    <form className="profile-form" id="profile-form" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="profile-form__section">
        <h3 className="profile-form__subheading">Контактная информация</h3>
        <div className="profile-form__inputs-block profile-form__inputs-block_contacts">
          <InputField
            label="Имя"
            {...register('username', {
              pattern: {
                value:
                  /^(?=^.{2,60}$)[А-ЯЁ][а-яё]{1,}([-][А-ЯЁ][а-яё]{1,})?(\s[А-ЯЁ][а-яё]{1,})?(\s[А-ЯЁ][а-яё]{1,})?([-][А-ЯЁ][а-яё]{1,})?$/,
                message: 'Укажите ваше имя. Пример: Апполинарий Вальдемарович фон Спасо-Преображенский',
              },
              required: 'Заполните поле имя',
            })}
            error={errors?.first_name}
            isValid={!getFieldState('username').invalid}
          />
          <InputField
            label="E-mail"
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Введите Email. Пример: example@example.ru',
              },
              required: 'Заполните поле email',
            })}
            error={errors?.email}
            isValid={!getFieldState('email').invalid}
          />
          <InputField
            label="Телефон"
            {...register('phone', {
              pattern: {
                value: /^((\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{10}$/i,
                message: 'Укажите номер телефона. Пример: +7(999) 999-99-99',
              },
              required: 'Заполните поле телефон',
            })}
            error={errors?.phone}
            isValid={!getFieldState('phone').invalid}
          />
        </div>
      </div>
      <div className="profile-form__section">
        <h3 className="profile-form__subheading">Адрес</h3>
        <div className="profile-form__inputs-block profile-form__inputs-block_address">
          <InputField
            disabled
            label="Город"
            {...register('city', { required: 'Заполните поле город' })}
            error={errors?.city}
            isValid={!getFieldState('city').invalid}
          />
          <InputField
            label="Улица"
            {...register('street', { required: 'Укажите адрес. Пример: ул. Цветочная' })}
            error={errors?.street}
            isValid={!getFieldState('street').invalid}
          />
          <div className="profile-form__small-iputs-wrapper">
            <InputField
              label="Дом"
              size="small"
              {...register('house', { required: 'Укажите номер дома. Пример: д. 15, Лит. С' })}
              error={errors?.house}
              isValid={!getFieldState('house').invalid}
            />
            <InputField
              label="Квартира"
              size="small"
              {...register('apartment', { minLength: 1, maxLength: { value: 4, message: 'Не более 4х знаков' } })}
              error={errors?.apartment}
              isValid={!getFieldState('apartment').invalid}
            />
          </div>
          <div className="profile-form__small-iputs-wrapper">
            <InputField
              label="Подъезд"
              size="small"
              {...register('entrance', { minLength: 0, maxLength: { value: 2, message: 'Не более 2х знаков' } })}
              error={errors?.entrance}
              isValid={!getFieldState('entrance').invalid}
            />
            <InputField
              label="Этаж"
              size="small"
              {...register('floor', { minLength: 0, maxLength: { value: 2, message: 'Не более 2х знаков' } })}
              error={errors?.floor}
              isValid={!getFieldState('floor').invalid}
            />
          </div>
        </div>
      </div>
      <div className="profile-form__button-wrapper">
        <Button buttonClassName="button" buttonText="Сохранить изменения" />
      </div>
    </form>
  )
}

export default ProfileForm

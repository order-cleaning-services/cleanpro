import { useForm } from 'react-hook-form'
import Button from '../Button/Button'
import InputField from '../InputField/InputField'
import './ProfileForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { authSelectors } from '../../store/auth/authSelectors'
import { updateUser } from '../../store/auth/authActions'
import { PATTERNS } from '../../utils/validation'

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
  })

  function onSubmit(data) {
    const { city, street, house, apartment, floor, entrance, ...rest } = data
    const body = { address: { city, street, house, apartment, floor, entrance }, ...rest }
    dispatch(updateUser(body))
  }

  return (
    <form className="profile-form" id="profile-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="profile-form__section">
        <h3 className="profile-form__subheading">Контактная информация</h3>
        <div className="profile-form__inputs-block profile-form__inputs-block_contacts">
          <InputField
            label="Имя"
            value={userData?.username || ''}
            {...register('username', {
              pattern: PATTERNS.USERNAME,
              required: 'Заполните поле имя',
            })}
            error={errors?.username}
            isValid={!getFieldState('username').invalid}
          />
          <InputField
            label="E-mail"
            value={userData?.email || ''}
            {...register('email', {
              pattern: PATTERNS.EMAIL,
              required: 'Заполните поле email',
            })}
            error={errors?.email}
            isValid={!getFieldState('email').invalid}
          />
          <InputField
            label="Телефон"
            value={userData?.phone || ''}
            {...register('phone', {
              pattern: PATTERNS.PHONE,
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
            label="Город"
            value="Москва"
            {...register('city')}
            error={errors?.city}
            isValid={!getFieldState('city').invalid}
          />
          <InputField
            label="Улица"
            value={userData?.address?.street || ''}
            {...register('street', { required: 'Укажите адрес. Пример: ул. Цветочная' })}
            error={errors?.street}
            isValid={!getFieldState('street').invalid}
          />
          <div className="profile-form__small-iputs-wrapper">
            <InputField
              label="Дом"
              value={userData?.address?.house || ''}
              size="small"
              {...register('house', { required: 'Укажите номер дома. Пример: д. 15, Лит. С' })}
              error={errors?.house}
              isValid={!getFieldState('house').invalid}
            />
            <InputField
              label="Квартира"
              value={userData?.address?.apartment || ''}
              size="small"
              {...register('apartment', { minLength: 1, maxLength: { value: 4, message: 'Не более 4х знаков' } })}
              error={errors?.apartment}
              isValid={!getFieldState('apartment').invalid}
            />
          </div>
          <div className="profile-form__small-iputs-wrapper">
            <InputField
              label="Подъезд"
              value={userData?.address?.entrance || ''}
              size="small"
              {...register('entrance', { minLength: 0, maxLength: { value: 2, message: 'Не более 2х знаков' } })}
              error={errors?.entrance}
              isValid={!getFieldState('entrance').invalid}
            />
            <InputField
              label="Этаж"
              value={userData?.address?.floor || ''}
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

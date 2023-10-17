import { useSelector, useDispatch } from 'react-redux'
import { handleClickEntry, handleClickRecovery, handleClickRegistration } from '../../store/formEntry/formEntrySlice'
import { useForm, Controller } from 'react-hook-form'
import Button from '../Button/Button'
import InputField from '../InputField/InputField'
import { formEntrySelectors } from '../../store/formEntry/formEntrySelectors'
import './FormEntry.scss'
import { registration, signInUser } from '../../store/auth/authActions'
import { useEffect } from 'react'
import { PATTERNS } from '../../utils/validation'

function FormEntry() {
  const viewForm = useSelector(formEntrySelectors.getFormView)
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    clearErrors,
    getFieldState,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleEntry = () => dispatch(handleClickEntry())
  const handleRecovery = () => dispatch(handleClickRecovery())
  const handleRegistration = () => dispatch(handleClickRegistration())

  useEffect(() => {
    dispatch(handleClickRegistration())
  }, [dispatch])

  const onSubmit = (data, e) => {
    if (viewForm === 'registration') dispatch(registration(data))
    if (viewForm === 'entry') dispatch(signInUser(data))
    //TODO action recovery
    // if (viewForm === 'recovery')
    e.target.reset()
    reset({ email: '' }, { password: '' })
  }

  return (
    <section className="form-entry">
      <form action="" className="form-entry__container" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="form-entry__content">
          {viewForm === 'registration' && (
            <div className="form-entry__wrapper-title">
              <p className="form-entry__title form-entry__title_active">Регистрация</p>
              <p
                onClick={() => {
                  handleEntry()
                  clearErrors()
                }}
                className="form-entry__title">
                Вход
              </p>
            </div>
          )}
          {viewForm === 'entry' && (
            <div className="form-entry__wrapper-title">
              <p
                onClick={() => {
                  handleRegistration()
                  clearErrors()
                }}
                className="form-entry__title ">
                Регистрация
              </p>
              <p className="form-entry__title form-entry__title_active">Вход</p>
            </div>
          )}
          {viewForm === 'recovery' && <p className="form-entry__title-recovery">Восстановление пароля</p>}

          <div className="form-entry__input-container">
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Заполните все поля.' },
                pattern: PATTERNS.EMAIL,
                maxLength: {
                  value: 30,
                  message: 'Недопустимая длина',
                },
                minLength: {
                  value: 5,
                  message: PATTERNS.EMAIL.message,
                },
              }}
              render={({ field: { onChange } }) => (
                <InputField
                  key={`${viewForm}-email`}
                  type="email"
                  label="Почта"
                  onChange={onChange}
                  isValid={!getFieldState('email').invalid}
                  error={errors?.email}
                />
              )}
              name="email"
            />
            {(viewForm === 'registration' || viewForm === 'entry') && (
              <div className="form-enter__wrapper-input">
                <Controller
                  control={control}
                  rules={{
                    required: { value: true, message: 'Заполните все поля.' },
                    pattern: PATTERNS.PASSWORD,
                  }}
                  render={({ field: { onChange } }) => (
                    <InputField
                      key={`${viewForm}-password`}
                      type="password"
                      label="Пароль"
                      onChange={onChange}
                      isValid={!getFieldState('password').invalid}
                      error={errors?.password}
                    />
                  )}
                  name="password"
                />
              </div>
            )}
          </div>
          <div className="form-entry__button-container">
            {viewForm === 'registration' && (
              <Button buttonText={'Зарегистрироваться'} buttonClassName="button" type="submit" />
            )}
            {viewForm === 'entry' && <Button buttonText={'Войти'} buttonClassName="button" type="submit" />}
            {viewForm === 'recovery' && (
              <Button buttonText={'Восстановить пароль'} buttonClassName="button button__recovery" type="submit" />
            )}
          </div>
          {viewForm === 'registration' && (
            <p className="form-entry__acceptance">
              Нажимая «Зарегистрироваться», я даю согласие на обработку персональных данных.
            </p>
          )}
          {viewForm === 'entry' && (
            <p
              onClick={() => {
                handleRecovery()
                clearErrors()
              }}
              className="form-entry__password-recovery">
              Забыли пароль?
            </p>
          )}
          {viewForm === 'recovery' && (
            <>
              <p className="form-entry__recovery-text">
                Мы отправим письмо со ссылкой для восстановления пароля на указанную почту.
              </p>
              <p
                onClick={() => {
                  handleEntry()
                  clearErrors()
                }}
                className="form-entry__password-recovery">
                Вернуться к авторизации
              </p>
            </>
          )}
        </div>
      </form>
    </section>
  )
}

export default FormEntry

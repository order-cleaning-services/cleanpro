import { useSelector, useDispatch } from 'react-redux'
import { handleClickEntry, handleClickRecovery, handleClickRegistration } from '../../store/slices/formEntrySlice'
import { useForm, Controller } from 'react-hook-form'
import Button from '../Button/Button'
import InputField from '../InputField/InputField'
import './FormEntry.scss'

function FormEntry() {
  const viewForm = useSelector(state => state.formEntrySlice.formView)
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

  const onSubmit = (data, e) => {
    console.log('ok')
    e.target.reset()
    reset({ email: '' }, { password: '' })
  }


  return (
    <section className="form-entry">
      <form action="" className="form-entry__container" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="form-entry__content">
          {viewForm === 'registration' ? (
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
          ) : viewForm === 'entry' ? (
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
          ) : (
            <p className="form-entry__title-recovery">Восстановление пароля</p>
          )}

          <div className="form-entry__input-container">
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Заполните все поля.' },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Введите Email. Пример: example@example.ru',
                },
              }}
              render={({ field: { onChange } }) => (
                <InputField
                  key={`${viewForm}-email`}
                  type="email"
                  label="Почта"
                  onChange={onChange}
                  isValid={!getFieldState('email').invalid}
                />
              )}
              name="email"
            />
            {errors.email && <span className="form-entry__error">{errors.email.message}</span>}
            {(viewForm === 'registration' || viewForm === 'entry') && (
              <div className="form-enter__wrapper-input">
                <Controller
                  control={control}
                  rules={{
                    required: { value: true, message: 'Заполните все поля.' },
                    pattern: {
                      value: /[0-9a-zA-Z!@#$%^&*]{8,16}$/,
                      message:
                        'Пароль должен включать в себя заглавные, прописные буквы, символы и цифры, и иметь не менее 8 и не более 16 символов.',
                    },
                  }}
                  render={({ field: { onChange } }) => (
                    <InputField
                      key={`${viewForm}-password`}
                      type="password"
                      label="Пароль"
                      onChange={onChange}
                      isValid={!getFieldState('password').invalid}
                    />
                  )}
                  name="password"
                />
              </div>
            )}
            {errors.password && <span className="form-entry__error">{errors.password.message}</span>}
          </div>
          <div className="form-entry__button-container">
            {viewForm === 'registration' ? (
              <Button buttonText={'Зарегистрироваться'} buttonClassName="button" type="submit" />
            ) : viewForm === 'entry' ? (
              <Button buttonText={'Войти'} buttonClassName="button" type="submit" />
            ) : (
              <Button buttonText={'Восстановить пароль'} buttonClassName="button button__recovery" type="submit" />
            )}
          </div>
          {viewForm === 'registration' ? (
            <p className="form-entry__acceptance">
              Нажимая «Зарегистрироваться», я даю согласие на обработку персональных данных.
            </p>
          ) : viewForm === 'entry' ? (
            <p
              onClick={() => {
                handleRecovery()
                clearErrors()
              }}
              className="form-entry__password-recovery">
              Забыли пароль?
            </p>
          ) : (
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

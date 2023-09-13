import { useSelector, useDispatch } from 'react-redux'
import { handleClickEntry, handleClickRecovery, handleClickRegistration } from '../../store/slices/formEntrySlice'
import Button from '../Button/Button'
import InputField from '../InputField/InputField'
import './FormEntry.scss'

function FormEntry() {
  const viewForm = useSelector(state => state.formEntrySlice.formView)
  const dispatch = useDispatch()

  const handleEntry = () => dispatch(handleClickEntry())
  const handleRecovery = () => dispatch(handleClickRecovery())
  const handleRegistration = () => dispatch(handleClickRegistration())

  return (
    <section className="form-entry">
      <form action="" className="form-entry__container">
        <div className="form-entry__content">
          {viewForm === 'registration' ? (
            <div className="form-entry__wrapper-title">
              <p className="form-entry__title form-entry__title_active">Регистрация</p>
              <p onClick={handleEntry} className="form-entry__title">
                Вход
              </p>
            </div>
          ) : viewForm === 'entry' ? (
            <div className="form-entry__wrapper-title">
              <p onClick={handleRegistration} className="form-entry__title ">
                Регистрация
              </p>
              <p className="form-entry__title form-entry__title_active">Вход</p>
            </div>
          ) : (
            <p className="form-entry__title-recovery">Восстановление пароля</p>
          )}

          <div className="form-entry__input-container">
            <InputField key={`${viewForm}-email`} type="email" label="Почта" />
            {(viewForm === 'registration' || viewForm === 'entry') && (
              <div className="form-enter__wrapper-input">
                <InputField key={`${viewForm}-password`} type="password" label="Пароль" />
              </div>
            )}
          </div>
          <div className="form-entry__button-container">
            {viewForm === 'registration' ? (
              <Button buttonText={'Зарегистрироваться'} buttonClassName="button" />
            ) : viewForm === 'entry' ? (
              <Button buttonText={'Войти'} buttonClassName="button" />
            ) : (
              <Button buttonText={'Восстановить пароль'} buttonClassName="button button__recovery" />
            )}
          </div>
          {viewForm === 'registration' ? (
            <p className="form-entry__acceptance">
              Нажимая «Зарегистрироваться», я даю согласие на обработку персональных данных.
            </p>
          ) : viewForm === 'entry' ? (
            <p onClick={handleRecovery} className="form-entry__password-recovery">
              Забыли пароль?
            </p>
          ) : (
            <>
              <p className="form-entry__recovery-text">
                Мы отправим письмо со ссылкой для восстановления пароля на указанную почту.
              </p>
              <p onClick={handleEntry} className="form-entry__password-recovery">
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

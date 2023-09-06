import { useSelector, useDispatch } from 'react-redux'
import { handleClickEntry } from '../../store/slices/formEntrySlice'
import './TitleFormEntry.scss'

function TitleFormEntry({ handleClickRegistration }) {
  const stateFormView = useSelector(state => state.formEntrySlice.formView.registration)
  const dispatch = useDispatch()

  const onViewEnter = () => dispatch(handleClickEntry())

  return (
    <>
      {stateFormView === 'registration' ? (
        <div className="form-entry__wrapper-title">
          <p className="form-entry__title form-entry__title_active">Регистрация</p>
          <p onClick={onViewEnter} className="form-entry__title">
            Вход
          </p>
        </div>
      ) : stateFormView === 'entry' ? (
        <div className="form-entry__wrapper-title">
          <p onClick={handleClickRegistration} className="form-entry__title ">
            Регистрация
          </p>
          <p className="form-entry__title form-entry__title_active">Вход</p>
        </div>
      ) : (
        <p className="form-entry__title">Забыли пароль?</p>
      )}
    </>
  )
}

export default TitleFormEntry

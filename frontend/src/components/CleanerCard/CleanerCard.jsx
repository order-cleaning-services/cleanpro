import './CleanerCard.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleClickStaff } from '../../store/admin/adminSlice'
import InputFieldCleaner from '../InputFieldCleaner/InputFieldCleaner'

function CleanerCard() {
  const dispatch = useDispatch()
  const { handleSubmit, onChange, register } = useForm({
    mode: 'onBlur',
  })
  const onSubmit = data => {
    handleSubmit
    console.log(data)
  }
  return (
    <section className="office">
      <div className="cleaners-change__link-wrapper">
        <Link className="cleaners-change__link text-m-bold" onClick={() => dispatch(handleClickStaff())}>
          Назад
        </Link>
      </div>
      <form className="cleaners-change__form" onSubmit={handleSubmit(onSubmit)}>
        <img alt="Фото клинера" className="cleaners-change__image" />
        <div className="cleaners-change__wrapper">
          <h4 className="cleaners-change__name">{name}</h4>
          <InputFieldCleaner onChange={onChange} label="Телефон" {...register('phone')} />
          <InputFieldCleaner onChange={onChange} label="Почта" {...register('email')} />
          <InputFieldCleaner onChange={onChange} label="Опыт работы" {...register('experience')} />
          <textarea
            className="cleaners-change__textarea text-s"
            type="text"
            placeholder="Например, сильная аллергия на кошек"
            {...register('comments')}
          />
          <button type="submit" className="cleaners-change__btn text-m-bold">
            Сохранить
          </button>
        </div>
      </form>
    </section>
  )
}

export default CleanerCard

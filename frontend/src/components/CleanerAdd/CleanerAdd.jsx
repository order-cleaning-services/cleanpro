import './../CleanerCard/CleanerCard.scss'
import InputFieldCleaner from '../InputFieldCleaner/InputFieldCleaner'
import { Link } from 'react-router-dom'
import { handleClickStaff } from '../../store/admin/adminSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function CleanerAdd() {
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
        <Link onClick={() => dispatch(handleClickStaff())} className="cleaners-change__link text-m-bold">
          Назад
        </Link>
      </div>
      <form className="cleaners-change__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          id="input__file"
          className="cleaners-change__add-image"
          onChange={onChange}
          {...register('image')}
        />
        <label className="cleaners-change__add-label" htmlFor="input__file">
          <span className="cleaners-change__add-span">+</span>
          <span>Добавить фото</span>
        </label>
        <div className="cleaners-change__wrapper">
          <h4 className="cleaners-change__name">Новый клинер</h4>
          <InputFieldCleaner onChange={onChange} label="Фамилия" {...register('secondname')} />
          <InputFieldCleaner onChange={onChange} label="Имя" {...register('name')} />
          <InputFieldCleaner onChange={onChange} label="Отчество" {...register('surname')} />
          <InputFieldCleaner onChange={onChange} label="Телефон" {...register('phone')} />
          <InputFieldCleaner onChange={onChange} label="Почта" {...register('email')} />
          <label>Комментарий</label>
          <textarea
            className="cleaners-change__textarea text-s"
            type="text"
            placeholder="Например, сильная аллергия на кошек"
            onChange={onChange}
            {...register('comment')}
          />
          <button type="submit" className="cleaners-change__btn text-m-bold">
            Сохранить
          </button>
        </div>
      </form>
    </section>
  )
}

export default CleanerAdd

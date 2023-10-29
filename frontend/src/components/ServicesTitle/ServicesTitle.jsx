import './ServicesTitle.scss'

import { useState } from 'react'

import edit from '../../images/edit.png'
import UploadButton from '../UploadButton/UploadButton'
import AdminModal from '../Modal/AdminModal/AdminModal'

function ServicesTitle({ title }) {
  const [stateDelete, setStateDelete] = useState(false)

  function handleClick() {
    setStateDelete(!stateDelete)
  }

  return (
    <div className="services-title">
      <div className="services-title__title">
        <p className="services-title__name text-x-bold">{title}</p>
        <img className="services-title__img" src={edit} alt="Редактировать" />
      </div>
      <div>
        <UploadButton onClick={handleClick} text="Удалить" visible="visible" style="upload__button" />
        {stateDelete === true && (
          <AdminModal title="Вы уверены, что хотите удалить пакт услуг?" back="Вернуться" onClick={handleClick} />
        )}
      </div>
    </div>
  )
}

export default ServicesTitle

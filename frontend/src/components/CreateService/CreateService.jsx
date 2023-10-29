import { useState, useEffect } from 'react'
import './CreateService.scss'

import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'

import CheckboxAll from '../CheckboxAll/CheckboxAll'
import ButtonAdmin from '../ButtonAdmin/ButtonAdmin'
import InputParameters from '../InputParameters/InputParameters'
import DragDrop from '../DragDrop/DragDrop'
import AddExtra from '../AddExtra/AddExtra'
import BackLink from '../BackLink/BackLink'
import UnitSelect from '../UnitSelect/UnitSelect'

function CreateService({ onClick }) {
  const [stateRadio, setStateRadio] = useState(true)
  const viewTab = useSelector(adminSelectors.getAdminTab)

  useEffect(() => {
    const listener = e => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        e.preventDefault()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  function handleClick() {
    setStateRadio(!stateRadio)
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className="create">
      {viewTab === 'services' && (
        <>
          <BackLink onClick={onClick} />
          <form onSubmit={handleSubmit} id="create-form" action="" className="create__form">
            <div className="create__container">
              <div className="create__services">
                <p className="filters__title filters__title_size text-m-bold">Тип уборки</p>
                <div className="filters__radio">
                  <label>
                    <input
                      defaultChecked={true}
                      onClick={handleClick}
                      className="filters__input"
                      type="radio"
                      name="Radio"
                      value="Основная"
                    />
                    Основная
                  </label>
                  <label>
                    <input
                      className="filters__input"
                      onClick={handleClick}
                      type="radio"
                      name="Radio"
                      value="Дополнительная"
                    />
                    Дополнительная
                  </label>
                </div>
              </div>
              {stateRadio === true ? (
                <>
                  <div className="create__packages">
                    <p className="create__title create__title_size text-m-bold">Присутствует в пакете</p>
                    <div className="filters__checkbox">
                      <CheckboxAll />
                    </div>
                  </div>
                  <div className="create__parameters">
                    <p className="filters__title text-m-bold">Параметры</p>
                    <div className="create__body-parameters">
                      <InputParameters
                        style="text-s"
                        name="select-name"
                        label="Название"
                        type="text"
                        placeholder="например, пылесосим"
                      />
                      <br />
                      <InputParameters
                        type="number"
                        style="text-s"
                        name="select-time"
                        label="Время выполнения,мин"
                        placeholder=""
                      />
                      <br />
                      <InputParameters
                        style="text-s"
                        name="select-price"
                        label="Стоимость,руб"
                        type="number"
                        placeholder=""
                      />
                      <br />
                      <div className="create__container-inputs">
                        <InputParameters
                          type="number"
                          min="0"
                          placeholder=""
                          className="input-parameters__input_small"
                          style="text-s"
                          name="select-name"
                          label="Количество"
                        />

                        <div className="create__form-select">
                          <label className="input-parameters__label">Единица</label>
                          <UnitSelect />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="create_photo">
                    <p className="filters__title text-m-bold">Фотография</p>
                    <DragDrop />
                  </div>
                </>
              ) : (
                <AddExtra />
              )}
            </div>
            <div className="create__button">
              <ButtonAdmin onSubmit={handleSubmit} id="create-form-btn" text="Сохранить" />
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default CreateService

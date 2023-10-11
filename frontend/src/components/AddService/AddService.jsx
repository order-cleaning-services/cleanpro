import './AddService.scss'

import CheckboxAll from '../CheckboxAll/CheckboxAll'
import ButtonAdmin from '../ButtonAdmin/ButtonAdmin'
import SelectReact from '../SelectReact/SelectReact'
import InputParameters from '../InputParameters/InputParameters'
import DragDrop from '../DragDrop/DragDrop'
import { unit } from '../../utils/initialData'

import { customerStylesSelectParameters } from '../../assets/styles/customerStylesSelectParameters'

import back from '../../images/arrow-back.svg'
import { useState } from 'react'
import AddExtra from '../AddExtra/AddExtra'

function AddService({ onClick }) {
  const [stateRadio, setStateRadio] = useState(true)

  function handleClick() {
    setStateRadio(!stateRadio)
  }

  return (
    <div className="add">
      <div className="add__back text-m" onClick={onClick}>
        <img className="add__arrow" src={back} alt="Назад" />
        Назад
      </div>
      <form action="" className="add__form">
        <div className="add__container">
          <div className="add__services">
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
              <div className="add__packages">
                <p className="add__title add__title_size text-m-bold">Присутствует в пакете</p>
                <div className="filters__checkbox">
                  <CheckboxAll />
                </div>
              </div>
              <div className="add__parameters">
                <p className="filters__title text-m-bold">Параметры</p>
                <div className="add__body-parameters">
                  <InputParameters label="Название" type="text" placeholder="например, пылесосим" />
                  <InputParameters label="Время выполнения,мин" type="number" placeholder="" />
                  <InputParameters label="Стоимость,руб" type="number" placeholder="" />
                  <label className="input-parameters__label">Единица измерения</label>
                  <SelectReact style={customerStylesSelectParameters} options={unit} />
                </div>
              </div>
              <div className="add_photo">
                <p className="filters__title text-m-bold">Фотография</p>
                <DragDrop />
              </div>
            </>
          ) : (
            <AddExtra />
          )}
        </div>
        <div className="add__button">
          <ButtonAdmin text="Сохранить" />
        </div>
      </form>
    </div>
  )
}

export default AddService

import './AddExtra.scss'

import InputParameters from '../InputParameters/InputParameters'
import UnitSelect from '../UnitSelect/UnitSelect'

function AddExtra() {
  return (
    <div className="add-extra">
      <InputParameters
        width={'23.7rem'}
        style="text-s"
        name="select-name"
        label="Название"
        type="text"
        placeholder="например, пылесосим"
      />
      <div className="add-extra__item-time">
        <InputParameters
          width={'18rem'}
          style="text-s"
          name="select-time "
          className={'add-extra__item-time'}
          label="Время выполнения,мин"
          type="number"
          placeholder=""
        />
      </div>
      <div className="add-extra__item-price">
        <InputParameters
          width={'12rem'}
          style="text-s"
          name="select-price"
          label="Стоимость,руб"
          type="number"
          placeholder=""
        />
      </div>
      <div className="add-extra__item-price">
        <InputParameters
          width={'10rem'}
          style="text-s"
          name="select-price"
          label="Количество"
          type="number"
          placeholder=""
        />
      </div>
      <div className="add-extra__item-unit">
        <label className="input-parameters__label">Единица</label>
        <UnitSelect />
      </div>
    </div>
  )
}

export default AddExtra

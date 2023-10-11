import './AddExtra.scss'

import InputParameters from '../InputParameters/InputParameters'
import SelectReact from '../SelectReact/SelectReact'
import { unit } from '../../utils/initialData'
import { customerStylesSelectParameters } from '../../assets/styles/customerStylesSelectParameters'

function AddExtra() {
  return (
    <div className="add-extra">
      <div className="add-extra__item-name">
        <InputParameters label="Название" type="text" placeholder="например, пылесосим" />
      </div>
      <div className="add-extra__item-time">
        <InputParameters className={'add-extra__item-time'} label="Время выполнения,мин" type="number" placeholder="" />
      </div>
      <div className="add-extra__item-price">
        <InputParameters label="Стоимость,руб" type="number" placeholder="" />
      </div>
      <div className="add-extra__item-unit">
        <label className="input-parameters__label">Единица измерения</label>
        <SelectReact style={customerStylesSelectParameters} options={unit} />
      </div>
    </div>
  )
}

export default AddExtra

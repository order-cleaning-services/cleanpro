import './AdditionalInfoAdmin.scss'

import ExtraListAdmin from '../ExtraListAdmin/ExtraListAdmin'
import DataClientAdmin from '../DataClientAdmin/DataClientAdmin'

function AdditionalInfoAdmin() {
  return (
    <div className="additional grid">
      <div className=" grid__additional">
        <div className="additional__flex">
          <div className="additional__client">
            <h4 className="additional__title text-m-bold">Клиент</h4>
            <DataClientAdmin />
          </div>
          <div className="additional__list">
            <h4 className="additional__title text-m-bold">Дополнительные услуги</h4>
            <ExtraListAdmin />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdditionalInfoAdmin

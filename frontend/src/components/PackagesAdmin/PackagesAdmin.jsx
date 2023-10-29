import './PackagesAdmin.scss'

import UploadButton from '../UploadButton/UploadButton'

import { packagesServices } from '../../utils/adminData'
import edit from '../../images/edit.png'

function PackagesAdmin({ onClick, handleOnClick }) {
  function handleClickButton() {
    handleOnClick()
  }

  function handleClick(id) {
    onClick(id)
  }

  return (
    <div className="packages">
      <>
        <div className="packages__container">
          {packagesServices.map(item => {
            return (
              <>
                <div className="packages__card">
                  <div className="packages__body">
                    <p className="packages__title text-m">{item.title}</p>
                    <div className="packages__items">
                      <div className="packages__item">
                        <p className="packages__name text-s">{item.servicesTitle}</p>
                        <p className="packages__unit text-s">{item.quantity}</p>
                      </div>
                      <div className="packages__item">
                        <p className="packages__name text-s">{item.timeTitle}</p>
                        <p className="packages__unit text-s">{item.time}</p>
                      </div>
                      <div className="packages__item">
                        <p className="packages__name text-s">{item.priceTitle}</p>
                        <p className="packages__unit text-s">{item.price}</p>
                      </div>
                    </div>
                    <div onClick={() => handleClick(item.id)} className="packages__edit">
                      <img className="packages__img" src={edit} alt="Редактировать" />
                      <p className="packages__text text-m">Редактировать</p>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        <div className="packages__button">
          <UploadButton onClick={handleClickButton} text="+&#160;&#160; Создать пакет" />
        </div>
      </>
    </div>
  )
}

export default PackagesAdmin

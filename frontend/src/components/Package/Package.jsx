import { useState } from 'react'

import '../GridAdmin/GridAdmin.scss'
import './Package.scss'

import ButtonAdmin from '../ButtonAdmin/ButtonAdmin'
import ChoiceModal from '../Modal/ChoiceModal/ChoiceModal'
import PackageItem from '../PackageItem/PackageItem'
import Result from '../Result/Result'

import { titlesList } from '../../utils/adminData'

function Package() {
  const [stateAddService, setStateAddService] = useState(false)

  function handleClickAddService() {
    setStateAddService(!stateAddService)
  }
  return (
    <div className="package">
      <div className="grid-package">
        {titlesList.map(item => {
          return (
            <>
              <p className="grid-package__item text-s">{item}</p>
            </>
          )
        })}
      </div>

      <PackageItem />
      {
        stateAddService === false && (
          <>
            <p onClick={handleClickAddService} className="package__add-package text-m">
              + &#160;&#160;Добавить услугу
            </p>

            <Result />
            <div className="package__add-button">
              <ButtonAdmin text="Сохранить" />
            </div>
          </>
        )
        // :
      }
      {stateAddService === true && <ChoiceModal onClick={handleClickAddService} />}
    </div>
  )
}

export default Package

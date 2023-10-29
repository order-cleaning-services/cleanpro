import './NewPackage.scss'
import '../ServicesTitle/ServicesTitle.scss'
import '../ChoiceService/ChoiceService.scss'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { packageAdminSelectors } from '../../store/packages/packageAdminSelectors'
import {
  returnIdServiceItemNew,
  addServiceNewPackage,
  removeServiceNewPackage,
} from '../../store/packages/packageAdminSlice'

import BackLink from '../BackLink/BackLink'
import PackageListItem from '../PackageListItem/PackageListItem'
import TableTitleServices from '../TableTitleServices/TableTitleServices'
import ButtonAdmin from '../ButtonAdmin/ButtonAdmin'
import Result from '../Result/Result'

import edit from '../../images/edit.png'

function NewPackage({ handleOnClick }) {
  const [style, setStyle] = useState('')
  const { disabled, setDisabled } = useState(true)
  const dispatch = useDispatch()

  const packages = useSelector(packageAdminSelectors.getPackages)
  const newPackage = useSelector(packageAdminSelectors.getNewPackage)

  function handleSetValue() {
    setStyle('new-package__input')
    setDisabled(false)
  }

  function toggleClick(item) {
    dispatch(returnIdServiceItemNew(item.id))
    let arr = newPackage
    const indexObj = arr
      .map(x => {
        return x.id
      })
      .indexOf(item.id)
    if (indexObj === -1) {
      let obj = [...arr, item]
      dispatch(addServiceNewPackage(obj))
    } else {
      dispatch(removeServiceNewPackage(indexObj))
    }
  }

  return (
    <div className="new-package">
      <BackLink onClick={handleOnClick} />
      <form className="services-title">
        <div className="services-title__title">
          <input
            placeholder="Название"
            disabled={disabled}
            className={`new-package__title services-title__name ${style} text-x-bold`}
          />
          <img onClick={() => handleSetValue()} className="services-title__img" src={edit} alt="Редактировать" />
        </div>
        <div></div>
        <div className="new-package__container">
          <div className="grid-service">
            <TableTitleServices column="" font="text-s" style="choice__style" />
          </div>

          <div className="choice__list">
            <div className="choice__list-wrapper">
              {packages.map((item, index) => {
                return (
                  <>
                    <PackageListItem
                      key={item.id}
                      item={item}
                      id={item.id}
                      index={index}
                      name={item.name}
                      type={item.type}
                      price={item.price}
                      unit={item.unit}
                      time={item.time}
                      onClick={toggleClick}
                    />
                  </>
                )
              })}
            </div>
          </div>

          <Result />
        </div>
        <ButtonAdmin style="button-admin_style_new" text="Создать пакет" />
      </form>
    </div>
  )
}

export default NewPackage

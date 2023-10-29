import '../Modal.scss'

import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { packageAdminSelectors } from '../../../store/packages/packageAdminSelectors'
import { addPackage, removePackage } from '../../../store/packages/packageAdminSlice'

import TableTitleServices from '../../TableTitleServices/TableTitleServices'
import PackageListItem from '../../PackageListItem/PackageListItem'
import ButtonAdmin from '../../ButtonAdmin/ButtonAdmin'
import UploadButton from '../../UploadButton/UploadButton'

function ChoiceModal({ onClick }) {
  const [list, setList] = useState([])
  const dispatch = useDispatch()
  const packages = useSelector(packageAdminSelectors.getPackages)
  const editPackage = useSelector(packageAdminSelectors.getEditPackage)

  let initialList = []
  editPackage.forEach(function (item) {
    initialList.push(item.name)
    return initialList
  })

  function handleToggleClick(item) {
    let el = item.name
    let findEl = list.find(item => item === el)
    let findElInitial = initialList.find(item => item == el)
    if (findElInitial == el) {
      console.log('Совпадение')
    } else if (findEl !== el && findElInitial !== el) {
      list.push(el)
      setList([...list])
      dispatch(addPackage(item))
    } else {
      list.pop(el)
      setList([...list])
      dispatch(removePackage(item.id))
      return
    }
  }
  let renderList = [...list]

  // function handleState(active) {
  // 	active = !active
  // }

  return (
    <div className="modal">
      <div className="modal__overlay"></div>
      <div className="modal__choice">
        <p className="modal__choice-title text-x-bold">Выберите услуги для пакета</p>
        <div className="modal__choice-container">
          <TableTitleServices column="" font="text-s" style="choice__style" />
          <div className="modal__choice-list">
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
                    onClick={handleToggleClick}
                  />
                </>
              )
            })}
          </div>
        </div>
        <div className="modal__choice-info">
          <p className="modal__choice-info-title text-m-bold">Добавлено:</p>
          {renderList.map((item, index) => {
            return (
              <>
                <div key={index} className="modal__choice-info-items">
                  <p className="modal__choice-info-text text-m">{item}</p>
                  <p className="modal__choice-info-del">+</p>
                </div>
              </>
            )
          })}
        </div>
        <div className="modal__choice-buttons">
          <ButtonAdmin text="Сохранить" />
          <UploadButton onClick={onClick} width="width" text="Отменить" />
        </div>
      </div>
    </div>
  )
}

export default ChoiceModal

import '../GridAdmin/GridAdmin.scss'

import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { packageAdminSelectors } from '../../store/packages/packageAdminSelectors'
import { editServiceItem, returnServicePackage } from '../../store/packages/packageAdminSlice'

import close from '../../images/x-close.svg'

function PackageItem() {
  const dataPackage = useSelector(packageAdminSelectors.getPackagesItem)
  const getIdPackage = useSelector(packageAdminSelectors.getIdPackage)
  const editPackage = useSelector(packageAdminSelectors.getEditPackage)
  const getPackagesList = useSelector(packageAdminSelectors.getPackagesList)

  const dispatch = useDispatch()

  let listPackage = getPackagesList[getIdPackage].list

  useEffect(() => {
    dispatch(returnServicePackage(listPackage))
  }, [listPackage])

  function handleClick(id) {
    dispatch(editServiceItem(id))
  }

  return (
    <div className="grid-service">
      {editPackage.map(item => {
        return (
          <>
            <p className="grid-service__item grid-service__item_position text-m-bold">{item.name}</p>
            <p className="grid-service__item text-m">{item.price}</p>
            <p className="grid-service__item text-m">{item.unit}</p>
            <p className="grid-service__item text-m">{item.time}</p>
            <p className="grid-service__item text-m">{item.type}</p>
            <div onClick={() => handleClick(item.id)} className="grid-service__item text-m">
              {item.button}
              <img className="package__close" src={close} alt="Закрыть" />
            </div>
          </>
        )
      })}
      {dataPackage.map(item => {
        return (
          <>
            <p className="grid-service__item grid-service__item_position text-m-bold">{item.name}</p>
            <p className="grid-service__item text-m">{item.type}</p>
            <p className="grid-service__item text-m">{item.price}</p>
            <p className="grid-service__item text-m">{item.unit}</p>
            <p className="grid-service__item text-m">{item.time}</p>
            <div className="grid-service__item text-m">
              <img className="package__close" src={close} alt="Закрыть" />
            </div>
          </>
        )
      })}
    </div>
  )
}

export default PackageItem

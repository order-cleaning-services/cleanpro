import '../GridAdmin/GridAdmin.scss'

import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { packageAdminSelectors } from '../../store/packages/packageAdminSelectors'
import { editServiceItem, returnServicePackage } from '../../store/packages/packageAdminSlice'

import close from '../../images/x-close.svg'

function PackageItem() {
  // список, который обновляется после редактирования по нажатию в модальном окне кнопки Сохранить
  // до этого он обрабатывается с choiceModal (новые пакеты попадают в newListItems из func handleToggleClick)
  const editPackage = useSelector(packageAdminSelectors.getEditPackage)

  // в getIdPackage id пакета - геренальная, поддерживающая и т.д.
  const getIdPackage = useSelector(packageAdminSelectors.getIdPackage)

  //---- initial-списки услуг в каждого пакета (после нажатия "редактировать")
  const getPackagesList = useSelector(packageAdminSelectors.getPackagesList)

  const dispatch = useDispatch()

  let listPackage = getPackagesList[getIdPackage].list
  console.log(listPackage)
  useEffect(() => {
    dispatch(returnServicePackage(listPackage))
  }, [])

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
              <img className="package__close" src={close} alt="Закрыть" />
            </div>
          </>
        )
      })}
    </div>
  )
}

export default PackageItem

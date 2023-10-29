import './ChoiceService.scss'

import TableTitleServices from '../TableTitleServices/TableTitleServices'
import PackageListItem from '../PackageListItem/PackageListItem'

import { useDispatch, useSelector } from 'react-redux'
import { packageAdminSelectors } from '../../store/packages/packageAdminSelectors'
import { addPackage } from '../../store/packages/packageAdminSlice'

function ChoiceService({ visible }) {
  const dispatch = useDispatch()
  const packages = useSelector(packageAdminSelectors.getPackages)

  function handleClick(index) {
    dispatch(addPackage(index))
  }

  return (
    <div className="modal">
      <div className="modal__overlay">
        <div className="choice">
          <p className={`choice__title ${visible} text-x-bold`}>Выберите услуги для пакета</p>
          <TableTitleServices column="" font="text-s" style="choice__style" />
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
                      onClick={handleClick}
                    />
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChoiceService

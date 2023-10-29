import { useState } from 'react'

function PackageListItem({ name, type, price, unit, time, item, onClick }) {
  const [isActive, setIsActive] = useState(false)

  function handleClickAdd(item) {
    onClick(item)
  }

  return (
    <div className="grid-services">
      <p className="grid-services__item text-m-bold">{name}</p>
      <p className="grid-services__item text-m">{price}</p>
      <p className="grid-services__item text-m">{type}</p>
      <p className="grid-services__item text-m">{unit}</p>
      <p className="grid-services__item text-m">{time}</p>
      <div
        onClick={e => {
          e.preventDefault()
          handleClickAdd(item)
          setIsActive(!isActive)
        }}
        className="grid-services__item  text-m">
        <button className={`text-m grid-services__button ${isActive === true ? 'btn-decrement' : 'btn-increment'}`}>
          {isActive ? '-' : '+'}
        </button>
      </div>
    </div>
  )
}

export default PackageListItem

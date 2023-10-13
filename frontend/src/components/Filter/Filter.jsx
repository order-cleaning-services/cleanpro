import './Filter.scss'

import filter from '../../assets/images/filter.svg'

function Filter({ onClick }) {
  return (
    <div onClick={onClick} className="filter">
      <img className="filter__icon" src={filter} alt="Фильтр" />
      <p className="filter__text text-m">Фильтры</p>
      <p className="filter__count filter__count_style_background">2</p>
    </div>
  )
}

export default Filter

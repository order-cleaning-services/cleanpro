import './OfficeAdmin.scss'

import { useDispatch, useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'

import TableTitle from '../TableTitle/TableTitle'
import Search from '../Search/Search'
import CardOrder from '../CardOrder/CardOrder'
import Filters from '../Filters/Filters'
import filter from '../../images/filter.svg'

import {
  handleClickNew,
  handleClickCurrent,
  handleClickCompleted,
  handleClickСancelled,
} from '../../store/admin/adminSlice'
import { useState } from 'react'

function OfficeAdmin() {
  const viewTab = useSelector(adminSelectors.getAdminTab)
  const dispatch = useDispatch()

  const [visibleFieldFilters, setVisibleFieldFilters] = useState(false)
  console.log(visibleFieldFilters)
  function handleToggleClick() {
    if (visibleFieldFilters === false) {
      setVisibleFieldFilters(true)
    } else {
      setVisibleFieldFilters(false)
    }
  }

  return (
    <section className="office">
      <div className="office__headings">
        <div className={`office__heading ${viewTab === 'new' ? 'office__title_active' : ''}`}>
          <p className="office__title text-l" onClick={() => dispatch(handleClickNew())}>
            Новые
          </p>
          <p className="office__count">99</p>
        </div>
        <div className={`office__heading ${viewTab === 'current' ? 'office__title_active' : ''}`}>
          <p className="office__title text-l" onClick={() => dispatch(handleClickCurrent())}>
            Текущие
          </p>
        </div>
        <div className={`office__heading ${viewTab === 'completed' ? 'office__title_active' : ''}`}>
          <p className="office__title text-l" onClick={() => dispatch(handleClickCompleted())}>
            Завершенные
          </p>
        </div>
        <div className={`office__heading ${viewTab === 'cancelled' ? 'office__title_active' : ''}`}>
          <p className="office__title text-l" onClick={() => dispatch(handleClickСancelled())}>
            Отмененные
          </p>
          <p className="office__count">7</p>
        </div>
      </div>
      <div className="office__field-search">
        <form className="office__data-search">
          <div className="office__search">
            <Search />
            <div onClick={handleToggleClick} className="office__filter">
              <img className="office__filter-icon" src={filter} alt="Фильтр" />
              <p className="office__filter-text text-m">Фильтры</p>
              <p className="office__count office__count_style_background">2</p>
            </div>
          </div>
        </form>
        <button className="office__button text-m">Выгрузить данные</button>
      </div>
      <Filters stateVisible={visibleFieldFilters} />
      <div className="office__table">
        <TableTitle />
      </div>
      <CardOrder />
      <CardOrder />
    </section>
  )
}

export default OfficeAdmin

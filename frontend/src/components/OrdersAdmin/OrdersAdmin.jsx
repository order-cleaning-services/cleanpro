import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'

import Headings from '../Headings/Headings'
import Search from '../Search/Search'
import Filters from '../Filters/Filters'
import Filter from '../Filter/Filter'
import UploadButton from '../UploadButton/UploadButton'
import Table from '../Table/Table'

import { headings, headingsServices } from '../../utils/adminData'

function OrdersAdmin() {
  const adminNavLink = useSelector(adminSelectors.getAdminNavLink)
  const viewTab = useSelector(adminSelectors.getAdminTab)
  const [visibleFieldFilters, setVisibleFieldFilters] = useState(false)
  const [createService, setCreateService] = useState(true)

  const dispatch = useDispatch()

  function handleClickCreate() {
    setCreateService(!createService)
  }

  function handleToggleClick() {
    if (visibleFieldFilters === false) {
      setVisibleFieldFilters(true)
    } else {
      setVisibleFieldFilters(false)
    }
  }

  return (
    <section className="orders-admin">
      {adminNavLink === 'orders' && (
        <div className="headings">
          {headings.map(h => (
            <Headings
              key={headings.id}
              onClick={() => dispatch(h.handleClick)}
              tab={h.handleTab}
              title={h.title}
              count={h.count}
            />
          ))}
        </div>
      )}
      {adminNavLink === 'packages' && (
        <div className="headings">
          {headingsServices.map(h => (
            <Headings
              key={headingsServices.id}
              onClick={() => dispatch(h.handleClick)}
              tab={h.handleTab}
              title={h.title}
              count={h.count}
            />
          ))}
        </div>
      )}
      <div className="office__field-search">
        <form className="office__data-search">
          <div className="office__search">
            <div className="office__search-flex">
              <Search placeholder="Поиск услуги" />
              <Filter onClick={handleToggleClick} />
            </div>
            <UploadButton text="Выгрузить данные" />
          </div>
          <Filters stateVisible={visibleFieldFilters} />
        </form>
        {adminNavLink === 'services' && viewTab !== 'packages' && (
          <UploadButton onClick={handleClickCreate} text="+&#160;&#160; Создать услугу" />
        )}
      </div>
      <Table onClick={handleToggleClick} />
    </section>
  )
}

export default OrdersAdmin

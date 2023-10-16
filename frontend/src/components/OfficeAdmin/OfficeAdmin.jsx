import './OfficeAdmin.scss'
import '../Headings/Headings.scss'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Search from '../Search/Search'
import Filters from '../Filters/Filters'
import Filter from '../Filter/Filter'
import Table from '../Table/Table'
import UploadButton from '../UploadButton/UploadButton'
import Headings from '../Headings/Headings'
import { headings } from '../../utils/headingsData'

function OfficeAdmin() {
  const dispatch = useDispatch()

  const [visibleFieldFilters, setVisibleFieldFilters] = useState(false)

  function handleToggleClick() {
    if (visibleFieldFilters === false) {
      setVisibleFieldFilters(true)
    } else {
      setVisibleFieldFilters(false)
    }
  }

  return (
    <section className="office">
      <div className="headings">
        {headings.map(h => (
          <Headings
            key={h.id}
            onClick={() => dispatch(h.handleClick)}
            tab={h.handleTab}
            title={h.title}
            count={h.count}
          />
        ))}
      </div>
      <div className="office__field-search">
        <form className="office__data-search">
          <div className="office__search">
            <div className="office__search-flex">
              <Search />
              <Filter onClick={handleToggleClick} />
            </div>
            <UploadButton text="Выгрузить данные" />
          </div>
          <Filters stateVisible={visibleFieldFilters} />
        </form>
      </div>
      <Table />
    </section>
  )
}

export default OfficeAdmin

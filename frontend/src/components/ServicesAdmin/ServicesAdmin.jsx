import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'
import { returnIdPackage } from '../../store/packages/packageAdminSlice'

import Headings from '../Headings/Headings'
import Search from '../Search/Search'
import Filters from '../Filters/Filters'
import Filter from '../Filter/Filter'
import UploadButton from '../UploadButton/UploadButton'
import Table from '../Table/Table'
import PackagesAdmin from '../PackagesAdmin/PackagesAdmin'
import EditServiceAdmin from '../EditServiceAdmin/EditServiceAdmin'
import NewPackage from '../NewPackage/NewPackage'

import { headingsServices, packagesServices } from '../../utils/adminData'

function ServicesAdmin({ onClick }) {
  const adminNavLink = useSelector(adminSelectors.getAdminNavLink)
  const viewTab = useSelector(adminSelectors.getAdminTab)

  const dispatch = useDispatch()

  const [visibleFieldFilters, setVisibleFieldFilters] = useState(false)

  const [editPackage, setEditPackage] = useState(false)
  const [createPackage, setCreatePackage] = useState(false)
  const [editId, setEditId] = useState({})

  function handleClickButton() {
    setCreatePackage(!createPackage)
  }

  function handleClick() {
    onClick()
  }

  function handleClickBackEdit() {
    setEditPackage(!editPackage)
  }

  function handleClickEdit(id) {
    const obj = packagesServices.find(o => o.id === id)
    setEditId(obj)
    handleClickBackEdit()
    dispatch(returnIdPackage(id))
  }

  function handleToggleClick(e) {
    e.preventDefault
    if (visibleFieldFilters === false) {
      setVisibleFieldFilters(true)
    } else {
      setVisibleFieldFilters(false)
    }
  }

  return (
    <section>
      {adminNavLink === 'services' && viewTab === 'services' && (
        <>
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
          <div className="office__field-search">
            <form className="office__data-search">
              <div className="office__search">
                <div className="office__search-flex">
                  <Search placeholder="Поиск услуги" />
                  <Filter onClick={handleToggleClick} />
                </div>
                <UploadButton onClick={handleClick} text="+&#160;&#160; Создать услугу" />
              </div>
              <Filters stateVisible={visibleFieldFilters} />
            </form>
          </div>
          <Table />
        </>
      )}
      {adminNavLink === 'services' && viewTab === 'packages' && editPackage === false && createPackage === false && (
        <>
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
          <PackagesAdmin onClick={handleClickEdit} handleOnClick={handleClickButton} />
        </>
      )}
      {adminNavLink === 'services' && viewTab === 'packages' && editPackage === true && (
        <EditServiceAdmin onClick={handleClickBackEdit} item={editId} />
      )}
      {createPackage === true && <NewPackage handleOnClick={handleClickButton} />}
    </section>
  )
}

export default ServicesAdmin

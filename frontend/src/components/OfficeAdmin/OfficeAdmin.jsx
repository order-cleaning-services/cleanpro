import './OfficeAdmin.scss'
import '../Headings/Headings.scss'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'
import Search from '../Search/Search'
import Filters from '../Filters/Filters'
import Filter from '../Filter/Filter'
import Table from '../Table/Table'
import UploadButton from '../UploadButton/UploadButton'
import Headings from '../Headings/Headings'
import AddService from '../AddService/AddService'
import { headings, headingsServices } from '../../utils/headingsData'

// todo делать активный tab
// ** делать отступ на кнопке uploadButton
// ! сделать children для uploadButton
// todo ПОДЧИСТИТЬ CHECKBOXЫ
// !  Доделать  фото
// todo Доделать выпадающий список Единицы изменения.
// ! Модальное окно Единицы измерения.
// todo Делать редактирования для cardService

function OfficeAdmin() {
  const adminNavLink = useSelector(adminSelectors.getAdminNavLink)
  const dispatch = useDispatch()

  const [visibleFieldFilters, setVisibleFieldFilters] = useState(false)
  const [createService, setCreateService] = useState(true)
  console.log(createService)

  function handleToggleClick() {
    if (visibleFieldFilters === false) {
      setVisibleFieldFilters(true)
    } else {
      setVisibleFieldFilters(false)
    }
  }

  function handleClick() {
    setCreateService(!createService)
  }
  return (
    <div>
      {adminNavLink === 'services' && createService === false ? (
        <AddService onClick={handleClick} />
      ) : (
        <section className="office">
          {adminNavLink === 'orders' ? (
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
          ) : null}
          {adminNavLink === 'services' && (
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
                  {adminNavLink === 'orders' && <Search placeholder="Поиск заказа" />}
                  {adminNavLink === 'services' && <Search placeholder="Поиск услуги" />}
                  {(adminNavLink === 'orders' || (adminNavLink === 'services' && createService === true)) && (
                    <Filter onClick={handleToggleClick} />
                  )}
                </div>
              </div>
              <Filters stateVisible={visibleFieldFilters} />
            </form>
            {adminNavLink === 'orders' && <UploadButton text="Выгрузить данные" />}
            {adminNavLink === 'services' && <UploadButton onClick={handleClick} text="+&#160;&#160; Создать услугу" />}
          </div>
          <Table onClick={handleToggleClick} />
        </section>
      )}
    </div>
  )
}

export default OfficeAdmin

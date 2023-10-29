import './OfficeAdmin.scss'
import '../Headings/Headings.scss'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'

import OrdersAdmin from '../OrdersAdmin/OrdersAdmin'
import ServicesAdmin from '../ServicesAdmin/ServicesAdmin'
import CreateService from '../CreateService/CreateService'

function OfficeAdmin() {
  const adminNavLink = useSelector(adminSelectors.getAdminNavLink)
  const viewTab = useSelector(adminSelectors.getAdminTab)
  const [createService, setCreateService] = useState(false)

  function handleClickCreate() {
    setCreateService(!createService)
  }

  return (
    <div className="office">
      {adminNavLink === 'orders' && <OrdersAdmin />}
      {viewTab === 'services' && createService === false ? (
        <ServicesAdmin onClick={handleClickCreate} />
      ) : (
        <CreateService onClick={handleClickCreate} />
      )}
      {viewTab === 'packages' && <ServicesAdmin />}
    </div>
  )
}

export default OfficeAdmin

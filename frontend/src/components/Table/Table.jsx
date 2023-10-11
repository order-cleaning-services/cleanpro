import TableTitle from '../TableTitle/TableTitle'
import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'
import TableTitleServices from '../TableTitleServices/TableTitleServices'

import CardOrder from '../CardOrder/CardOrder'
import CardService from '../CardService/CardService'

function Table() {
  const adminNavLink = useSelector(adminSelectors.getAdminNavLink)

  return (
    <div>
      {adminNavLink === 'orders' && (
        <>
          <TableTitle />
          <CardOrder />
        </>
      )}
      {adminNavLink === 'services' && (
        <>
          <TableTitleServices />
          <CardService />
        </>
      )}
    </div>
  )
}

export default Table

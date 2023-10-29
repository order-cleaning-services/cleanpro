import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'

import TableTitle from '../TableTitle/TableTitle'
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
          <TableTitleServices font="text-s" style="style  text-m" />
          <CardService style="card-service__item" />
        </>
      )}
    </div>
  )
}

export default Table

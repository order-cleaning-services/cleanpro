// import React from 'react';
import AsideAdmin from '../../components/AsideAdmin/AsideAdmin'
import OfficeAdmin from '../../components/OfficeAdmin/OfficeAdmin'
import Footer from '../../components/Footer/Footer'
import './AdminPage.scss'
import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'
import Statistics from '../../components/Statistics/Statistics'

function AdminPage() {
  const adminNavLink = useSelector(adminSelectors.getAdminNavLink)

  return (
    <>
      <section className="admin">
        <AsideAdmin />
        {adminNavLink === 'orders' && <OfficeAdmin />}
        {adminNavLink === 'statistics' && <Statistics />}
      </section>
      <Footer />
    </>
  )
}

export default AdminPage

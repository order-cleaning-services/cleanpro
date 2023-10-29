// import React from 'react';
import AsideAdmin from '../../components/AsideAdmin/AsideAdmin'
import OfficeAdmin from '../../components/OfficeAdmin/OfficeAdmin'
import Footer from '../../components/Footer/Footer'
import './AdminPage.scss'

function AdminPage() {
  return (
    <>
      <section className="admin">
        <AsideAdmin />
        <OfficeAdmin />
      </section>
      <Footer />
    </>
  )
}

export default AdminPage

// import React from 'react';
import AsideAdmin from '../AsideAdmin/AsideAdmin'
import OfficeAdmin from '../OfficeAdmin/OfficeAdmin'
import Footer from '../Footer/Footer'
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

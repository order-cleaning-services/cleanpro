// import React from 'react';
import AsideAdmin from '../AsideAdmin/AsideAdmin'
import OfficeAdmin from '../OfficeAdmin/OfficeAdmin'
import Footer from '../Footer/Footer'
import './Admin.scss'

function Admin() {
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

export default Admin

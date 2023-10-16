import AsideAdmin from '../../components/AsideAdmin/AsideAdmin'
import OfficeAdmin from '../../components/OfficeAdmin/OfficeAdmin'
import Footer from '../../components/Footer/Footer'
import CleanersAdmin from '../../components/CleanersAdmin/CleanersAdmin'
import CleanerCard from '../../components/CleanerCard/CleanerCard'
import CleanerAdd from '../../components/CleanerAdd/CleanerAdd'
import './AdminPage.scss'
import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'
import Statistics from '../../components/Statistics/Statistics'

function AdminPage() {
  const linkView = useSelector(adminSelectors.getAdminNavLink)

  return (
    <>
      <section className="admin">
        <AsideAdmin />
        {linkView === 'orders' ? <OfficeAdmin /> : null}
        {linkView === 'staff' ? <CleanersAdmin /> : null}
        {linkView === 'cleanerCard' ? <CleanerCard /> : null}
        {linkView === 'newCleaner' ? <CleanerAdd /> : null}
        {linkView === 'statistics' && <Statistics />}
      </section>
      <Footer />
    </>
  )
}

export default AdminPage

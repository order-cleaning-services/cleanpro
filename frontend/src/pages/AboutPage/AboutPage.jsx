import './AboutPage.scss'
import Footer from '../../components/Footer/Footer'
import About from '../../components/About/About'
import CleanersList from '../../components/CleanersList/CleanersList'

function AboutPage() {
  return (
    <div className="about-page">
      <h2 className="about-page__title">О компании</h2>
      <About />
      <h2 className="about-page__title">Наши клинеры</h2>
      <CleanersList />
      <Footer />
    </div>
  )
}

export default AboutPage

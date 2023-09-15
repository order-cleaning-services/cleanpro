import './AboutPage.scss'
import Footer from '../../components/Footer/Footer'
import About from '../../components/About/About'
import CleanersList from '../../components/CleanersList/CleanersList'
import ButtonOrder from '../../components/ButtonOrder/ButtonOrder'

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-page__wrapper">
        <h2 className="about-page__title">О компании</h2>
        <About />
        <h2 className="about-page__title">Наши клинеры</h2>
        <CleanersList />
      </div>
      <Footer />
      <ButtonOrder height={0} />
    </div>
  )
}

export default AboutPage

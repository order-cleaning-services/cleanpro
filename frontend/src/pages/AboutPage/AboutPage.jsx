import './AboutPage.scss'
import Footer from '../../components/Footer/Footer'
import About from '../../components/About/About'
import CleanersList from '../../components/CleanersList/CleanersList'
import ButtonOrder from '../../components/ButtonOrder/ButtonOrder'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Comments from '../../components/Comments/Comments'

function AboutPage() {
  const location = useLocation()

  useEffect(() => {
    const elementId = location.hash.substring(1)
    scrollToElement(elementId)
  }, [location])

  const scrollToElement = elementId => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="about-page">
      <div className="about-page__wrapper">
        <h2 id="about">О компании</h2>
        <About />
        <h2 id="cleaners">Наши клинеры</h2>
        <CleanersList />
      </div>
      <Comments />
      <Footer />
      <ButtonOrder height={0} />
    </div>
  )
}

export default AboutPage

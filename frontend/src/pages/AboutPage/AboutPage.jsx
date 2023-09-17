import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import './AboutPage.scss'
import Footer from '../../components/Footer/Footer'
import Banner from '../../components/Banner/Banner'

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
        <h2
          id="about"
          className="about-page__title"
          style={{
            height: '1000px',
          }}>
          О компании
        </h2>
        <Banner />

        <h2
          id="cleaners"
          className="about-page__title"
          style={{
            height: '1000px',
          }}>
          Наши клинеры
        </h2>
      </div>
      <Footer />
    </div>
  )
}

export default AboutPage

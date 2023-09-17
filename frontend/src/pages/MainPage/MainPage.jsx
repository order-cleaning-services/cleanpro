import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Banner from '../../components/Banner/Banner'
import Footer from '../../components/Footer/Footer'
import Comments from '../../components/Comments/Comments'
import Process from '../../components/Process/Process'
import Calculator from '../../components/Calculator/Calculator'
import Materials from '../../components/Materials/Materials'
import Faq from '../../components/Faq/Faq'

export default function MainPage() {
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
    <>
      <Banner />
      <Process />
      <Calculator />
      <Comments />
      <Materials />
      <Faq />
      <Footer />
    </>
  )
}

import Banner from '../../components/Banner/Banner'
import Footer from '../../components/Footer/Footer'
import Comments from '../../components/Comments/Comments'
import Process from '../../components/Process/Process'
import Calculator from '../../components/Calculator/Calculator'
import Materials from '../../components/Materials/Materials'
import Faq from '../../components/Faq/Faq'
import ButtonOrder from '../../components/ButtonOrder/ButtonOrder'

export default function MainPage() {
  return (
    <>
      <Banner />
      <Process />
      <Calculator />
      <Comments />
      <Materials />
      <Faq />
      <Footer />
      <ButtonOrder height={2700} />
    </>
  )
}

import { useSwiper } from 'swiper/react'
import './ButtonsSwiper.scss'
const ButtonsSwiper = () => {
  const swiper = useSwiper()
  return (
    <div className="button-nav-swiper">
      <button onClick={() => swiper.slidePrev()} className="comments__button comments__button_left"></button>
      <button onClick={() => swiper.slideNext()} className="comments__button comments__button_rigth"></button>
    </div>
  )
}
export default ButtonsSwiper

import { useSwiper } from 'swiper/react'

function ButtonNavSwiper() {
  const swiper = useSwiper()

  return (
    <div className="button-nav-swiper">
      <button onClick={() => swiper.slidePrev()} className="button-prev"></button>
      <button onClick={() => swiper.slideNext()} className="button-next"></button>
    </div>
  )
}

export default ButtonNavSwiper

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/css/pagination'
import './CleanersList.scss'

import cleanersData from '../../utils/cleaningData'
import ButtonNavSwiper from '../ButtonNavSwiper/ButtonNavSwiper'
import CleanerSlide from '../CleanerSlide/CleanerSlide'

function CleanersList() {
  return (
    <div className="cleaners">
      <Swiper
        spaceBetween={32}
        slidesPerView={4}
        centeredSlides={false}
        grabCursor={true}
        modules={[Navigation]}
        className="mySwiper">
        {cleanersData.map(slide => {
          return (
            <SwiperSlide key={slide.id} className="slide">
              <CleanerSlide slide={slide} />
            </SwiperSlide>
          )
        })}
        <ButtonNavSwiper />
      </Swiper>
    </div>
  )
}

export default CleanersList

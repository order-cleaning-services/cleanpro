import { Swiper } from 'swiper/react'
import { Navigation, Grid } from 'swiper/modules'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CommentsList from '../CommentsList/CommentsList'
import 'swiper/css'
import 'swiper/css/grid'
import './Comments.scss'
import ButtonsSwiper from '../ButtonsSwiper/ButtonsSwiper'
import { SwiperSlide } from 'swiper/react'
import { ratingsSelectors } from '../../store/ratings/ratingsSelectors'

const Comments = () => {
  const location = useLocation().pathname
  const ratings = useSelector(ratingsSelectors.getRatings)

  return (
    <>
      {Array.isArray(ratings) ? (
        <section className="comments">
          {location === '/' ? (
            <div className="comments__container">
              <div className="comments__wrapper" id="comments">
                <h2 className="comments__title">Отзывы клиентов</h2>
                <Link to="/about" className="comments__go">
                  Посмотреть все
                </Link>
              </div>
              <Swiper slidesPerView={4} spaceBetween={32} modules={[Navigation]} className="mySwiper comments__list">
                {ratings?.map(c => (
                  <SwiperSlide key={c.id}>
                    <CommentsList rating={c.score} comment={c.text} clientName={c.username} />
                  </SwiperSlide>
                ))}
                <ButtonsSwiper />
              </Swiper>
            </div>
          ) : (
            <div className="comments__container">
              <div className="comments__wrapper">
                <h2 className="comments__title">Отзывы клиентов</h2>
              </div>
              <Swiper
                slidesPerView={4}
                grid={{
                  rows: 2,
                  fill: 'row',
                }}
                spaceBetween={32}
                modules={[Navigation, Grid]}
                className="mySwiper comments__list">
                {ratings?.map(c => (
                  <SwiperSlide key={c.id}>
                    <CommentsList rating={c.score} comment={c.text} clientName={c.username} />
                  </SwiperSlide>
                ))}
                <ButtonsSwiper />
              </Swiper>
            </div>
          )}
        </section>
      ) : null}
    </>
  )
}
export default Comments

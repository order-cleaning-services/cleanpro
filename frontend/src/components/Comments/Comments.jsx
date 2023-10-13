import { Swiper } from 'swiper/react'
import { Navigation, Grid } from 'swiper/modules'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CommentsList from '../CommentsList/CommentsList'
import 'swiper/css'
import 'swiper/css/grid'
import './Comments.scss'
import ButtonsSwiper from '../ButtonsSwiper/ButtonsSwiper'
import { SwiperSlide } from 'swiper/react'
import { getRatings } from '../../store/ratings/ratingsActions'
import { ratingsSelectors } from '../../store/ratings/ratingsSelectors'
import { useEffect } from 'react'

const Comments = () => {
  const location = useLocation().pathname
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRatings())
  }, [dispatch])
  const ratings = useSelector(ratingsSelectors.getRatings)

  return (
    <section className="comments">
      {location === '/' ? (
        <>
          <div className="comments__wrapper" id="comments">
            <h2 className="comments__title">Отзывы клиентов</h2>
            <Link to="/about" className="comments__go">
              Посмотреть все
            </Link>
          </div>
          <Swiper slidesPerView={4} spaceBetween={32} modules={[Navigation]} className="mySwiper comments__list">
            {ratings.map(c => (
              <SwiperSlide key={c.id}>
                <CommentsList rating={c.score} comment={c.text} clientName={c.username} />
              </SwiperSlide>
            ))}
            <ButtonsSwiper />
          </Swiper>
        </>
      ) : (
        <>
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
            {ratings.map(c => (
              <SwiperSlide key={c.id}>
                <CommentsList rating={c.score} comment={c.text} clientName={c.username} />
              </SwiperSlide>
            ))}
            <ButtonsSwiper />
          </Swiper>
        </>
      )}
    </section>
  )
}
export default Comments

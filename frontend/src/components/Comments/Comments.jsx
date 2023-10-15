import { Swiper } from 'swiper/react'
import { Navigation, Grid } from 'swiper/modules'
import { Link, useLocation } from 'react-router-dom'
import CommentsList from '../CommentsList/CommentsList'
import 'swiper/css'
import 'swiper/css/grid'
import './Comments.scss'
import { comments } from '../../utils/commentsData'
import ButtonsSwiper from '../ButtonsSwiper/ButtonsSwiper'
import { SwiperSlide } from 'swiper/react'

const Comments = () => {
  const location = useLocation().pathname

  return (
    <section className="comments">
      <div className="comments__container">
        {location === '/' ? (
          <>
            <div className="comments__wrapper" id="comments">
              <h2 className="comments__title">Отзывы клиентов</h2>
              <Link to="/about" className="comments__go">
                Посмотреть все
              </Link>
            </div>
            <Swiper slidesPerView={4} spaceBetween={32} modules={[Navigation]} className="mySwiper comments__list">
              {comments.map(c => (
                <SwiperSlide key={c.id}>
                  <CommentsList
                    rating={c.rating}
                    comment={c.comment}
                    clientName={c.clientName}
                    charwomanName={c.charwomanName}
                  />
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
              {comments.map(c => (
                <SwiperSlide key={c.id}>
                  <CommentsList
                    rating={c.rating}
                    comment={c.comment}
                    clientName={c.clientName}
                    charwomanName={c.charwomanName}
                  />
                </SwiperSlide>
              ))}
              <ButtonsSwiper />
            </Swiper>
          </>
        )}
      </div>
    </section>
  )
}
export default Comments

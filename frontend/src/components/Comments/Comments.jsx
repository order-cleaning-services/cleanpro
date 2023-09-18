import { Swiper } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Link } from 'react-router-dom'
import CommentsList from '../CommentsList/CommentsList'
import 'swiper/css'
import './Comments.scss'
import { comments } from '../../utils/commentsData'
import ButtonsSwiper from '../ButtonsSwiper/ButtonsSwiper'
import { SwiperSlide } from 'swiper/react'

const Comments = () => {
  return (
    <>
      <section className="comments">
        <div className="comments__wrapper">
          <h2 className="comments__title">Отзывы клиентов</h2>
          <Link to="/" className="comments__go">
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
      </section>
    </>
  )
}
export default Comments

import CommentsList from '../CommentsList/CommentsList'
import 'swiper/css'
import '../Comments/Comments.scss'
import './CommentsAbout.scss'
import { comments } from '../../utils/commentsData'
import { useState } from 'react'

const CommentsAbout = () => {
  const [page, setPage] = useState(1)
  const handleCkick = () => {
    setPage(page => page + 1)
  }

  return (
    <>
      <section className="comments">
        <div className="comments__wrapper">
          <h2 className="comments__title">Отзывы клиентов</h2>
        </div>
        <div className="comments__about">
          {comments.slice(0, 8 * page).map(c => (
            <CommentsList
              key={c.id}
              rating={c.rating}
              comment={c.comment}
              clientName={c.clientName}
              charwomanName={c.charwomanName}
            />
          ))}
        </div>
        {comments.length > comments.slice(0, 8 * page).length && (
          <button className="comments__show" onClick={handleCkick}>
            Посмотреть больше
          </button>
        )}
      </section>
    </>
  )
}
export default CommentsAbout

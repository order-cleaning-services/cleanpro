import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import CommentsList from '../CommentsList/CommentsList'
import './Comments.scss'
import { comments } from './const'

const Comments = () => {
  const [page, setPage] = useState(1)
  const [beggin, setBeggin] = useState(0)

  const commentsToRender = useMemo(() => {
    if (beggin > comments.length) {
      setPage(1)
      setBeggin(0)
      return comments.slice(0, 4)
    } else {
      return comments.slice(beggin, 4 * page)
    }
  }, [beggin, page])

  const toNext = () => {
    setPage(page + 1)
    setBeggin(beggin + 4)
  }

  const toPrevious = () => {
    setPage(page - 1)
    setBeggin(beggin - 4)
  }

  return (
    <>
      <section className="comments">
        <div className="comments__wrapper">
          <h2 className="comments__title">Отзывы клиентов</h2>
          <Link to="/" className="comments__go">
            Посмотреть все
          </Link>
        </div>
        <ul className="comments__list">
          {commentsToRender.length > 0 &&
            commentsToRender
              .slice(0, 4 * page)
              .map(c => (
                <CommentsList
                  key={c.id}
                  rating={c.rating}
                  comment={c.comment}
                  clientName={c.clientName}
                  charwomanName={c.charwomanName}
                />
              ))}
        </ul>
        <button className="comments__button comments__button_left" onClick={toPrevious}></button>
        <button className="comments__button comments__button_rigth" onClick={toNext}></button>
      </section>
    </>
  )
}
export default Comments

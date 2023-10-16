import './CommentsList.scss'

const CommentsList = ({ rating, comment, clientName }) => {
  return (
    <div className="comments__cell">
      <div className="comments__upblock">
        <div className="comments__wrapper-rating">
          <h3 className="comments__name-client">{clientName}</h3>
          <p className="comments__rating">{rating},0</p>
        </div>
        <p className="comments__response">{comment}</p>
      </div>
    </div>
  )
}
export default CommentsList

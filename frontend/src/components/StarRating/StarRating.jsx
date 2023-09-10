import ReactStars from 'react-rating-stars-component'

function StarRating() {
  const ratingChanged = newRating => {
    console.log(newRating)
  }

  return <ReactStars activeColor="#FADB14" color="#d9d9d9" size={30} gap={9} onChange={ratingChanged} />
}

export default StarRating

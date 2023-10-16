import FetchAPI from '../utils/fetchAPI'

class RatingsApi {
  getRatings() {
    return FetchAPI.get('/ratings/')
  }
}

export default new RatingsApi()

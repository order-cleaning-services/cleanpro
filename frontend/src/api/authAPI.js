import FetchAPI from '../utils/fetchAPI'

class AuthAPI {
  auth(body) {
    return FetchAPI.post('/auth/token/login/', { body })
  }

  logout(body) {
    return FetchAPI.post('/auth/token/logout', { body })
  }

  create(body) {
    return FetchAPI.post('/users/', { body })
  }

  getUser(body) {
    return FetchAPI.get('/users/me/', { body })
  }
}

export default new AuthAPI()

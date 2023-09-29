import FetchAPI from '../utils/fetchAPI'

class AuthAPI {
  auth(body) {
    return FetchAPI.post('/auth/token/login/', { body })
  }

  logout(token) {
    return FetchAPI.post('/auth/token/logout', { token })
  }

  create(body) {
    return FetchAPI.post('/users/', { body })
  }

  getUser(token) {
    return FetchAPI.get('/users/me/', { token })
  }
}

export default new AuthAPI()

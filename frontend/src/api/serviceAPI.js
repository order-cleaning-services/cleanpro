import FetchApi from '../utils/fetchAPI'

class ServiceApi {
  getExra() {
    return FetchApi.get('/services/')
  }

  getTypes() {
    return FetchApi.get('/types')
  }
}

export default new ServiceApi()

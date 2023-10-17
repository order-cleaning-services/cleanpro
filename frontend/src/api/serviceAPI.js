import { API_URL } from '../constants/constants'
import FetchApi from '../utils/fetchAPI'

class ServiceApi {
  getExra() {
    return FetchApi.get(`${API_URL.SERVICES}`)
  }

  getTypes() {
    return FetchApi.get(`${API_URL.TYPES}`)
  }
}

export default new ServiceApi()

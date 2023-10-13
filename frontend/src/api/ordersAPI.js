import { API_URL } from '../constants/constants'
import FetchApi from '../utils/fetchAPI'

class OrdersApi {
  getOrders(token) {
    return FetchApi.get(`${API_URL.ORDERS}`, { token })
  }

  createOrder(body) {
    return FetchApi.post(`${API_URL.ORDERS}`, { body })
  }

  repeatOrder(token, id) {
    return FetchApi.get(`${API_URL.ORDERS}${id}/`, { token, id })
  }
  changeDateTime(order, body) {
    return FetchApi.patch(`/orders/${order}/`, body)
  }
  cancel(order, body) {
    return FetchApi.patch(`/orders/${order}/`, body)
  }
}

export default new OrdersApi()

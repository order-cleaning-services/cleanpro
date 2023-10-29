import FetchApi from '../utils/fetchAPI'

class OrdersApi {
  getOrders(token) {
    return FetchApi.get('/orders/', { token })
  }

  createOrder(body) {
    return FetchApi.post('/orders/', { body })
  }
}

export default new OrdersApi()

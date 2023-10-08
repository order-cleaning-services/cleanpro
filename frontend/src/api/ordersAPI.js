import FetchApi from '../utils/fetchAPI'

class OrdersApi {
  getOrders(token) {
    return FetchApi.get('/orders/', { token })
  }

  createOrder(body) {
    return FetchApi.post('/order_create/', { body })
  }

  repeatOrder(token, id) {
    return FetchApi.get(`/orders//${id}`, { token, id })
  }
}

export default new OrdersApi()

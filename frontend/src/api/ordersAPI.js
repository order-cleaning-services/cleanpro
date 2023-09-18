import FetchApi from '../utils/fetchAPI'

class OrdersApi {
  getOrders(body) {
    return FetchApi.get('/orders/', body)
  }

  createOrder(body) {
    return FetchApi.post('/order_create/', { body })
  }
}

export default new OrdersApi()

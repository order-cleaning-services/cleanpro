import FetchApi from '../utils/fetchAPI'

class OrdersApi {
  readOrders() {
    return FetchApi.get('/orders/')
  }

  createOrder(body) {
    return FetchApi.post('/order_create/', { body })
  }
}

export default new OrdersApi()

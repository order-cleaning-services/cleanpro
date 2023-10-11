const getAllOrders = state => state.order.orders
const getRepeatedOrder = state => state.order.repeatOrder

export const orderSelectors = {
  getAllOrders,
  getRepeatedOrder,
}

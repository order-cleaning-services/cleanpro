const getAllOrders = state => state.order.orders
const getRepeatedOrder = state => state.order.repeatOrder
const getRepeatedTotal = state => state.order.repeatedTotal

export const orderSelectors = {
  getAllOrders,
  getRepeatedOrder,
  getRepeatedTotal,
}

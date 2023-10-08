const getAllOrders = state => state.order.orders
const getName = state => state.order.repeatOrder.user.username
const getEmail = state => state.order.repeatOrder.user.email
const getPhone = state => state.order.repeatOrder.user.phone
const getStreet = state => state.order.repeatOrder.address.street
const getHouse = state => state.order.repeatOrder.address.house
const getEntrance = state => state.order.repeatOrder.address.entrance
const getApartment = state => state.order.repeatOrder.address.apartment
const getFloor = state => state.order.repeatOrder.address.floor

export const orderSelectors = {
  getAllOrders,
  getName,
  getEmail,
  getPhone,
  getStreet,
  getHouse,
  getEntrance,
  getApartment,
  getFloor,
}

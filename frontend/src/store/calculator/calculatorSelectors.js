const getCleanType = state => state.calculator.cleanType
const getTotal = state => state.calculator.total
const getRooms = state => state.calculator.roomsAmount
const getToilets = state => state.calculator.toiletsAmount
const getWindows = state => state.calculator.windowsAmount
const getExtras = state => state.calculator.extra
const getTypes = state => state.calculator.types
const getPanoramic = state => state.calculator.isPanoramic
const getOrderForm = state => state.calculator.orderForm

export const calculatorSelectors = {
  getTotal,
  getRooms,
  getToilets,
  getWindows,
  getExtras,
  getCleanType,
  getTypes,
  getOrderForm,
  getPanoramic,
}

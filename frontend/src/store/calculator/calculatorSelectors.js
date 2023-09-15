const getCleanType = state => state.calculator.cleanType
const getTotal = state => state.calculator.total
const getRooms = state => state.calculator.roomsAmount
const getToilets = state => state.calculator.toiletsAmount
const getWindows = state => state.calculator.windowsAmount
const getExtras = state => state.calculator.extra

export const calculatorSelectors = { getTotal, getRooms, getToilets, getWindows, getExtras, getCleanType }

import { createSlice } from '@reduxjs/toolkit'
import { extraServices, serviceCards } from '../../utils/initialData'

const initialState = {
  cleanType: serviceCards[0].id,
  total: 0,
  roomsAmount: 1,
  toiletsAmount: 1,
  windowsAmount: 1,
  extra: extraServices,
}

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: initialState,
  reducers: {
    setCleanType: (state, action) => {
      state.cleanType = action.payload
    },
    setTotal: (state, action) => {
      state.total = action.payload
    },
    setExtra: (state, action) => {
      const index = action.payload.index
      const newExtra = [...state.extra]
      newExtra[index].amount += action.payload.step
      state.total += action.payload.price
      state.extra = newExtra
    },
    deleteExtra: (state, action) => {
      state.total -= action.payload
    },
    setRooms: (state, action) => {
      state.roomsAmount += action.payload.step
      state.total += action.payload.price
    },
    setToilets: (state, action) => {
      state.toiletsAmount += action.payload.step
      state.total += action.payload.price
    },
    setWindows: (state, action) => {
      state.windowsAmount += action.payload.step
      state.total += action.payload.price
    },
    resetRooms: state => {
      state.roomsAmount = initialState.roomsAmount
      state.toiletsAmount = initialState.toiletsAmount
      state.extra = initialState.extra
    },
  },
})
export const { setCleanType, setTotal, setRooms, setToilets, setWindows, setExtra, resetRooms } =
  calculatorSlice.actions
export default calculatorSlice.reducer

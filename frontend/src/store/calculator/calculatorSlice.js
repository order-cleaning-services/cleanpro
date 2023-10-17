import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { buildGetExtraService, buildGetServiceTypes } from './extraReducers'

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
      state.total += action.payload.price
      state.extra[index].amount += action.payload.step
    },
    setExtraRepeated: (state, action) => {
      state.extra.map(ex => {
        const newAmount = action.payload.find(service => service.id === ex.id)?.amount
        if (newAmount) ex.amount = newAmount
      })
    },
    setTotalRepeated: (state, action) => {
      state.total = action.payload
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
    setIsPanoramic: state => {
      state.isPanoramic = !state.isPanoramic
      state.total = state.isPanoramic ? state.total * 2 : state.total / 2
    },
    resetRooms: state => {
      state.roomsAmount = initialState.roomsAmount
      state.toiletsAmount = initialState.toiletsAmount
      state.extra.map(extra => (extra.amount = 0))
    },
    safeOrderForm: (state, action) => {
      state.orderForm = action.payload
    },
  },
  extraReducers: builder => {
    buildGetServiceTypes(builder)
    buildGetExtraService(builder)
  },
})
export const {
  setCleanType,
  setTotal,
  setRooms,
  setToilets,
  setWindows,
  setIsPanoramic,
  setExtra,
  resetRooms,
  safeOrderForm,
  setExtraRepeated,
} = calculatorSlice.actions
export default calculatorSlice.reducer

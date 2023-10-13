import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { buildGetUserOrders, buildCreateOrder, buildRepeatOrder } from './extraReducers'

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload
    },
    setOrderbyId: (state, action) => {
      state.repeatOrder = action.payload
    },
    resetRepeatedOrder: state => {
      state.repeatOrder = initialState.repeatOrder
    },
    setRepeatedTotal: (state, action) => {
      state.repeatedTotal = action.payload
    },
  },
  extraReducers: builder => {
    buildGetUserOrders(builder)
    buildCreateOrder(builder)
    buildRepeatOrder(builder)
  },
})

export const { setOrders, resetRepeatedOrder, setRepeatedTotal } = orderSlice.actions
export default orderSlice.reducer

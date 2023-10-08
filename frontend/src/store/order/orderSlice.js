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
  },
  extraReducers: builder => {
    buildGetUserOrders(builder)
    buildCreateOrder(builder)
    buildRepeatOrder(builder)
  },
})

export const { setOrders } = orderSlice.actions
export default orderSlice.reducer

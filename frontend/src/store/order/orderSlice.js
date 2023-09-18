import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { buildGetUserOrders, buildCreateOrder } from './extraReducers'

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload
    },
  },
  extraReducers: builder => {
    buildGetUserOrders(builder)
    buildCreateOrder(builder)
  },
})

export const { setOrders } = orderSlice.actions
export default orderSlice.reducer

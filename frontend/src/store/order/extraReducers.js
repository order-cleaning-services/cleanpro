import { getUserOrders, createOrder, getOrderById } from './orderActions'

export const buildGetUserOrders = builder =>
  builder
    .addCase(getUserOrders.pending, state => {
      state.userOrdersStatus = 'pending'
    })
    .addCase(getUserOrders.fulfilled, (state, action) => {
      state.userOrdersStatus = 'success'
      state.orders = action.payload.results
      state.userOrdersError = null
    })
    .addCase(getUserOrders.rejected, state => {
      state.userOrdersStatus = 'error'
      state.userOrdersError = 'Sorry, something went wrong'
    })

export const buildCreateOrder = builder =>
  builder
    .addCase(createOrder.pending, state => {
      state.orderStatus = 'pending'
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.orderStatus = 'success'
      state.newOrder = action.payload
      state.orderError = null
    })
    .addCase(createOrder.rejected, state => {
      state.orderStatus = 'error'
      state.orderError = 'Sorry, something went wrong'
    })

export const buildRepeatOrder = builder =>
  builder
    .addCase(getOrderById.pending, state => {
      state.orderStatus = 'pending'
    })
    .addCase(getOrderById.fulfilled, (state, action) => {
      state.orderStatus = 'success'
      state.repeatOrder = action.payload
      state.orderError = null
    })
    .addCase(getOrderById.rejected, state => {
      state.orderStatus = 'error'
      state.orderError = 'Sorry, something went wrong'
    })

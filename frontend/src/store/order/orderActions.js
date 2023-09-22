import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../utils/tokenActions'
import ordersAPI from '../../api/ordersAPI'

export const getUserOrders = createAsyncThunk('order/orders', async (body, { rejectWithValue }) => {
  try {
    const token = getToken()
    const response = await ordersAPI.getOrders(token)
    return response
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const createOrder = createAsyncThunk('order/newOrder', async (body, { rejectWithValue }) => {
  try {
    const response = await ordersAPI.createOrder(body)
    return response
  } catch (e) {
    return rejectWithValue(e)
  }
})

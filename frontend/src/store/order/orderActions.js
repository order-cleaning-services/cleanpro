import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../utils/tokenActions'
import ordersAPI from '../../api/ordersAPI'
import { resetRooms, setCleanType, setExtraRepeated } from '../calculator/calculatorSlice'
import { setRepeatedTotal } from './orderSlice'

export const getUserOrders = createAsyncThunk('order/orders', async (_, { rejectWithValue }) => {
  try {
    const token = getToken()
    const response = await ordersAPI.getOrders(token)
    return response
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const createOrder = createAsyncThunk('order/newOrder', async (body, { dispatch, getState, rejectWithValue }) => {
  try {
    const response = await ordersAPI.createOrder(body)
    if (response) {
      const state = getState()
      dispatch(resetRooms())
      dispatch(setCleanType(state.calculator.types[0].id))
    }
    return response
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const getOrderById = createAsyncThunk(
  'order/repeatOrder',
  async (id, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = getToken()
      const response = await ordersAPI.repeatOrder(token, id)

      const state = getState()
      const servicePrice = state.calculator?.types?.filter(type => type.id === response?.cleaning_type?.id)[0]?.price
      const amountPrice = state.calculator.extra.reduce((sum, ex) => {
        const extra = response?.services?.find(service => service.id === ex.id)
        if (extra) return (sum += extra?.price * extra?.amount)
        return sum
      }, 0)

      dispatch(setCleanType(response?.cleaning_type?.id))
      dispatch(setExtraRepeated(response?.services))
      dispatch(setRepeatedTotal(servicePrice + amountPrice))
      return response
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import serviceAPI from '../../api/serviceAPI'
import { setTotal } from './calculatorSlice'

export const getServiceTypes = createAsyncThunk(
  'calculator/types',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await serviceAPI.getTypes()
      const state = getState()
      dispatch(setTotal(state.calculator.types[0]?.price))
      return response
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const getExtraService = createAsyncThunk('calculator/extra', async (_, { rejectWithValue }) => {
  try {
    const response = await serviceAPI.getExra()
    return response
  } catch (e) {
    return rejectWithValue(e)
  }
})

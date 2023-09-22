import { createAsyncThunk } from '@reduxjs/toolkit'
import serviceAPI from '../../api/serviceAPI'

export const getServiceTypes = createAsyncThunk('calculator/types', async (_, { rejectWithValue }) => {
  try {
    const response = await serviceAPI.getTypes()
    return response
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const getExtraService = createAsyncThunk('calculator/extra', async (_, { rejectWithValue }) => {
  try {
    const response = await serviceAPI.getExra()
    return response
  } catch (e) {
    return rejectWithValue(e)
  }
})

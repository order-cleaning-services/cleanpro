import { createAsyncThunk } from '@reduxjs/toolkit'
import RatingsApi from '../../api/ratingsAPI'

export const getRatings = createAsyncThunk('/ratings', async (_, { rejectWithValue }) => {
  try {
    const response = await RatingsApi.getRatings()
    return response
  } catch (e) {
    return rejectWithValue(e)
  }
})

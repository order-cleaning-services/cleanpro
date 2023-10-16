import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { buildGetRatings } from './extraReducers'

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState: initialState,
  reducers: {
    getRatings: (state, action) => {
      state.ratings = action.payload
    },
  },
  extraReducers: builder => {
    buildGetRatings(builder)
  },
})

export const { getRatings } = ratingsSlice.actions
export default ratingsSlice.reducer

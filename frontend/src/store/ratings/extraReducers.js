import { getRatings } from './ratingsActions'

export const buildGetRatings = builder =>
  builder
    .addCase(getRatings.pending, state => {
      state.ratingsStatus = 'pending'
    })
    .addCase(getRatings.fulfilled, (state, action) => {
      state.ratingsStatus = 'success'
      state.ratings = action.payload
      state.ratingsError = null
    })
    .addCase(getRatings.rejected, state => {
      state.ratingsStatus = 'error'
      state.ratingsError = 'Sorry, something went wrong'
    })

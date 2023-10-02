import { createSlice } from '@reduxjs/toolkit'

export const formOrderValidationSlice = createSlice({
  name: 'formOrderValidation',
  initialState: {
    stateDate: true,
  },
  reducers: {
    setIsStateDate: (state, action) => {
      state.stateDate = action.payload
    },
  },
})

export const { setIsStateDate } = formOrderValidationSlice.actions

export default formOrderValidationSlice.reducer

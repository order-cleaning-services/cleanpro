import { createSlice } from '@reduxjs/toolkit'

const formEntrySlice = createSlice({
  name: 'formEntrySlice',
  initialState: {
    formView: 'registration',
  },
  reducers: {
    handleClickEntry: state => {
      state.formView = 'entry'
    },
    handleClickRecovery: state => {
      state.formView = 'recovery'
    },
    handleClickRegistration: state => {
      state.formView = 'registration'
    },
  },
})

export const { handleClickEntry, handleClickRecovery, handleClickRegistration } = formEntrySlice.actions
export default formEntrySlice.reducer

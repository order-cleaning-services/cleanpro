import { combineReducers } from '@reduxjs/toolkit'
import calculatorSlice from './calculator/calculatorSlice'
import formEntrySlice from './formEntry/formEntrySlice'

export const rootReducer = combineReducers({
  calculator: calculatorSlice,
  formEntry: formEntrySlice,
})

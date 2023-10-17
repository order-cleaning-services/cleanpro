import { combineReducers } from '@reduxjs/toolkit'
import calculatorSlice from './calculator/calculatorSlice'
import formEntrySlice from './formEntry/formEntrySlice'
import authSlice from './auth/authSlice'
import orderSlice from './order/orderSlice'
import adminSlice from './admin/adminSlice'
import formOrderValidationSlice from './formOrderValidation/formOrderValidation'
import ratingsSlice from './ratings/ratingsSlice'

export const rootReducer = combineReducers({
  calculator: calculatorSlice,
  formEntry: formEntrySlice,
  auth: authSlice,
  order: orderSlice,
  admin: adminSlice,
  formOrderValidation: formOrderValidationSlice,
  ratings: ratingsSlice,
})

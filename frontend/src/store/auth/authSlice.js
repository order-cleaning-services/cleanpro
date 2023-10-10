import { createSlice } from '@reduxjs/toolkit'
import { buildGetUser, buildLogOut, buildRegistration, buildSignInUser, buildUpdateUser } from './extraReducers'
import { initialState } from './initialState'

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    resetSignInError: state => {
      state.signInError = null
      state.signInStatus = 'initial'
    },
    resetSignUpError: state => {
      state.signUpError = null
      state.signUpStatus = 'initial'
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: builder => {
    buildSignInUser(builder)
    buildRegistration(builder)
    buildLogOut(builder)
    buildGetUser(builder)
    buildUpdateUser(builder)
  },
})

export const { setIsAuth, resetSignInError, resetSignUpError, setUser } = authSlice.actions

export default authSlice.reducer

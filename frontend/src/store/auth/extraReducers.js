import { getUser, logOut, registration, signInUser, updateUser } from './authActions'

export const buildSignInUser = builder =>
  builder
    .addCase(signInUser.pending, state => {
      state.signInStatus = 'pending'
    })
    .addCase(signInUser.fulfilled, state => {
      state.signInStatus = 'success'
      state.isAuth = true
      state.signInError = null
    })
    .addCase(signInUser.rejected, state => {
      state.signInStatus = 'error'
      state.signInError = 'Sorry, something went wrong'
      if (state.signInError === 'User already in system') {
        state.isAuth = true
      }
    })

export const buildRegistration = builder =>
  builder
    .addCase(registration.pending, state => {
      state.signUpStatus = 'pending'
    })
    .addCase(registration.fulfilled, state => {
      state.signInStatus = 'success'
      state.signUpStatus = 'success'
      state.isAuth = true
      state.signInError = null
      state.signUpError = null
    })
    .addCase(registration.rejected, state => {
      state.signUpStatus = 'error'
      state.signUpError = 'Sorry, something went wrong'
    })

export const buildLogOut = builder =>
  builder
    .addCase(logOut.pending, state => {
      state.logOutStatus = 'pending'
    })
    .addCase(logOut.fulfilled, state => {
      state.logOutStatus = 'success'
      state.isAuth = false
      state.logOutError = null
      state.user = null
    })
    .addCase(logOut.rejected, state => {
      state.logOutStatus = 'error'
      state.logOutError = 'Sorry, something went wrong'
    })

export const buildGetUser = builder =>
  builder
    .addCase(getUser.pending, state => {
      state.userStatus = 'pending'
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.userStatus = 'success'
      state.user = action.payload ? action.payload : null
      state.isAuth = true
      state.userError = null
    })
    .addCase(getUser.rejected, state => {
      state.userStatus = 'error'
      state.isAuth = false
      state.user = null
      state.userError = 'Sorry, something went wrong'
    })

export const buildUpdateUser = builder =>
  builder
    .addCase(updateUser.pending, state => {
      state.userUpdateStatus = 'pending'
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.userUpdateStatus = 'success'
      state.user = action.payload
      state.userUpdateError = null
    })
    .addCase(updateUser.rejected, state => {
      state.userUpdateStatus = 'error'
      state.userUpdateError = 'Sorry, something went wrong'
    })

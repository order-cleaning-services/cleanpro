const getSignInError = state => state.auth.signInError
const getSignInStatus = state => state.auth.signInStatus
const getSignUpError = state => state.auth.signUpError
const getSignUpStatus = state => state.auth.signUpStatus
const getUser = state => state.auth.user
const getUserError = state => state.auth.userError
const getUserStatus = state => state.auth.userStatus
const getIsAuth = state => state.auth.isAuth

export const authSelectors = {
  getUserError,
  getUserStatus,
  getSignInError,
  getSignInStatus,
  getSignUpError,
  getSignUpStatus,
  getUser,
  getIsAuth,
}

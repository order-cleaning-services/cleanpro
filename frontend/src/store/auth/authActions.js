import { createAsyncThunk } from '@reduxjs/toolkit'
import authAPI from '../../api/authAPI'
import { setToken, getToken, removeToken } from '../../utils/tokenActions'

export const signInUser = createAsyncThunk('auth/signin', async (body, { dispatch, rejectWithValue }) => {
  try {
    const response = await authAPI.auth(body)
    const auth_token = response.auth_token
    setToken(auth_token)
    return dispatch(getUser())
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const logOut = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const token = getToken()
    const logout = await authAPI.logout(token)
    removeToken()
    return logout
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const getUser = createAsyncThunk('auth/getUser', async (_, { rejectWithValue }) => {
  try {
    const token = getToken()
    const res = await authAPI.getUser(token)
    return res
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const updateUser = createAsyncThunk('auth/updateUser', async (body, { getState, rejectWithValue }) => {
  try {
    const token = getToken()
    const state = getState()
    const id = state.auth.user.id
    const res = await authAPI.updateUser(id, body, token)
    return res
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const registration = createAsyncThunk('auth/signup', async (body, { dispatch, rejectWithValue }) => {
  try {
    const response = await authAPI.create(body)
    if (response) return dispatch(signInUser(body))
  } catch (e) {
    return rejectWithValue(e)
  }
})

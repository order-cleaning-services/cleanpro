import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'

const adminSlice = createSlice({
  name: 'admin',
  initialState: initialState,
  reducers: {
    handleClickOrders: state => {
      state.linkView = 'orders'
    },
    handleClickServices: state => {
      state.linkView = 'services'
    },
    handleClickStaff: state => {
      state.linkView = 'staff'
      state.tab = 'cliners'
    },
    handleClickStatistics: state => {
      state.linkView = 'statistics'
    },
    handleClickNew: state => {
      state.tab = 'new'
    },
    handleClickCurrent: state => {
      state.tab = 'current'
    },
    handleClickCompleted: state => {
      state.tab = 'completed'
    },
    handleClickСancelled: state => {
      state.tab = 'cancelled'
    },
    handleClickCliners: state => {
      state.tab = 'cliners'
    },
    handleClickSchedule: state => {
      state.tab = 'schedule'
    },
    handleClickCleanerCard: state => {
      state.linkView = 'cleanerCard'
    },
    handleClickNewCleaner: state => {
      state.linkView = 'newCleaner'
    },
  },
})

export const {
  handleClickOrders,
  handleClickServices,
  handleClickStaff,
  handleClickStatistics,
  handleClickNew,
  handleClickCurrent,
  handleClickCompleted,
  handleClickСancelled,
  handleClickCliners,
  handleClickSchedule,
  handleClickCleanerCard,
  handleClickNewCleaner,
} = adminSlice.actions
export default adminSlice.reducer

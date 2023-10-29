import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'

const packageAdminSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    returnIdPackage: (state, action) => {
      // надо посмотреть - это не id,  а index - изменить название
      state.idPackage = action.payload - 1
    },
    returnIdServiceItemNew: (state, action) => {
      state.idServiceItemNew = action.payload
    },
    addServiceNewPackage: (state, action) => {
      state.newPackage = action.payload
    },
    removeServiceNewPackage: state => {
      const arr = state.newPackage.filter(function (item) {
        return state.idServiceItemNew !== item.id
      })
      state.newPackage = arr
    },
    returnServicePackage: (state, action) => {
      state.editPackage = action.payload
    },

    editServiceItem: (state, action) => {
      state.idServiceItemEdit = action.payload
      let lists = state.editPackage.filter(x => {
        return x.id !== state.idServiceItemEdit
      })
      state.editPackage = lists
    },
    addPackage: (state, action) => {
      state.dataPackage = [...state.dataPackage, action.payload]
    },
    removePackage: (state, action) => {
      state.idServiceItemEdit = action.payload
      const arr = state.dataPackage.filter(function (item) {
        return state.idServiceItemEdit !== item.id
      })
      state.dataPackage = arr
    },
    initialUnit: (state, action) => {
      state.unit = action.payload
    },
    addUnit: (state, action) => {
      state.unit = action.payload
    },
    modalStateToggle: state => {
      state.stateModal = !state.stateModal
    },
  },
})

export const {
  editServiceItem,
  returnServicePackage,
  returnIdServiceItemNew,
  addServiceNewPackage,
  removeServiceNewPackage,
  returnIdPackage,
  initialUnit,
  addUnit,
  modalStateToggle,
  addPackage,
  setPackageItem,
  removePackage,
} = packageAdminSlice.actions
export default packageAdminSlice.reducer

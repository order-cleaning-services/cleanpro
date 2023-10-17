import { getServiceTypes, getExtraService } from './calculatorActions'

export const buildGetServiceTypes = builder =>
  builder
    .addCase(getServiceTypes.pending, state => {
      state.cleanTypeStatus = 'pending'
    })
    .addCase(getServiceTypes.fulfilled, (state, action) => {
      state.cleanTypeStatus = 'success'
      state.types = action.payload ? action.payload : []
      state.types.sort((a, b) => a.id - b.id)
      state.types.map(
        type => (type.price = type.service.reduce((acc, current) => acc + current.price, 0) * type.coefficient),
      )
      state.cleanType = state.types ? state.types[0]?.id : null
      state.cleanTypeError = null
    })
    .addCase(getServiceTypes.rejected, state => {
      state.cleanTypeStatus = 'error'
      state.cleanTypeError = 'Sorry, something went wrong'
    })

export const buildGetExtraService = builder =>
  builder
    .addCase(getExtraService.pending, state => {
      state.extraStatus = 'pending'
    })
    .addCase(getExtraService.fulfilled, (state, action) => {
      state.extraStatus = 'success'
      state.extra = action.payload ? action.payload : []
      state.extra.map(item => (item.amount = 0))
      state.extraError = null
    })
    .addCase(getExtraService.rejected, state => {
      state.extraStatus = 'error'
      state.extraError = 'Sorry, something went wrong'
    })

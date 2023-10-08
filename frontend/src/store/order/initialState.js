export const initialState = {
  orders: [],
  newOrder: null,
  repeatOrder: {
    user: { email: '', name: '', phone: '' },
    address: {
      apartment: '',
      street: '',
      house: '',
      entrance: '',
      floor: '',
    },
  },

  orderStatus: 'initial',
  orderError: null,

  userOrdersStatus: 'initial',
  userOrdersError: null,
}

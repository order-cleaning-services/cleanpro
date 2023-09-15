export const TOKEN_KEY = 'auth_token'

const setToken = access_token => {
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({
      value: access_token,
      timeStamp: new Date().getTime(),
    }),
  )
}

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

const getToken = () => {
  let result = null

  const storedToken = localStorage.getItem(TOKEN_KEY)
  storedToken && (result = { auth_token: JSON.parse(storedToken).value })

  return result
}

export { getToken, setToken, removeToken }

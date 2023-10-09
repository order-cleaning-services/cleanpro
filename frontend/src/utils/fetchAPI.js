import { TOKEN_KEY } from './tokenActions'

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
}

export class FetchAPI {
  static getURL = () => {
    throw new Error('Method not implemented.')
  }

  constructor(apiUrl) {
    this.API_URL = apiUrl
  }

  getURL() {
    return this.API_URL
  }

  get = async (url, options) => {
    return await baseFetch(this.API_URL + url, METHODS.GET, options)
  }

  post = async (url, options) => {
    return await baseFetch(this.API_URL + url, METHODS.POST, options)
  }

  delete = async url => {
    return await baseFetch(this.API_URL + url, METHODS.DELETE)
  }

  put = async (url, options) => {
    return await baseFetch(this.API_URL + url, METHODS.PUT, options)
  }

  patch = async (url, options) => {
    return await baseFetch(this.API_URL + url, METHODS.PATCH, options)
  }
}

const baseFetch = async (url, method, options = {}) => {
  const { body = null, token = null } = options
  let bodyFetch = JSON.stringify(body)

  const optionsFetch =
    token && body
      ? {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token[TOKEN_KEY]}`,
            'Access-Control-Allow-Credentials': true,
          },
          method,
          body: bodyFetch,
        }
      : token && !body
      ? {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token[TOKEN_KEY]}`,
            'Access-Control-Allow-Credentials': true,
          },
          method,
        }
      : !token && body
      ? {
          headers: {
            'Content-Type': 'application/json',
          },
          method,
          credentials: 'include',
          body: bodyFetch,
        }
      : {
          headers: {
            'Content-Type': 'application/json',
          },
          method,
          credentials: 'include',
        }

  let result
  const response = await fetch(url, optionsFetch)

  try {
    result = await response.json()
  } catch (e) {
    if (response.ok) {
      result = 'ok'
    }
    console.error(e)
  }

  if (!response.ok) {
    return Promise.reject(result.reason)
  }

  return result
}

export default new FetchAPI('http://localhost/api')

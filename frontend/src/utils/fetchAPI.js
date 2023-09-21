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
    return await baseFetch(this.API_URL + url, METHODS.GET, options?.body)
  }

  post = async (url, options) => {
    return await baseFetch(this.API_URL + url, METHODS.POST, options.body)
  }

  delete = async url => {
    return await baseFetch(this.API_URL + url, METHODS.DELETE)
  }

  put = async (url, options) => {
    return await baseFetch(this.API_URL + url, METHODS.PUT, options.body)
  }

  patch = async (url, options) => {
    return await baseFetch(this.API_URL + url, METHODS.PATCH, options.body)
  }
}

const baseFetch = async (url, method, body) => {
  let token
  if (body) token = Object.prototype.hasOwnProperty.call(body, TOKEN_KEY) ? body.auth_token : null

  let bodyFetch = JSON.stringify(body)

  const options = token
    ? {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
          'Access-Control-Allow-Credentials': true,
        },
        method,
      }
    : method === METHODS.GET
    ? {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
        method,
      }
    : {
        headers: {
          'Content-Type': 'application/json',
        },
        method,
        credentials: 'include',
        body: bodyFetch,
      }

  let result
  const response = await fetch(url, options)

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

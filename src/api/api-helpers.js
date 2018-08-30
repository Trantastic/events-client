/* Dev */
// import { pink } from 'logger'
import { parse } from './cookie-parser'

const rejectErrors = (res) => {
  const { status } = res
  if (status >= 200 && status < 300) {
    return res
  } else if (status === 422) {
    return Promise.reject({ error: 'Email or Password is Invalid' })
  }
  return Promise.reject(res)
}

export const removeToken = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

export const fetchJson = (url, options = {}) => {
  // const token = store.auth ? '' : `Token ${store.auth.currentUser.token}`
  let token
  const tokenObj = parse(document.cookie)
  let headers = {
    ...options.headers,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if (tokenObj.hasOwnProperty('token')) {
    token = `Token ${tokenObj.token}`
    headers.authorization = token
  }

  return (
    fetch(url, {
      ...options,
      credentials: 'include',
      headers,
    }).then(rejectErrors)
      .then((res) => res.json())
  )
}

export const fetchUploadImage = (url, options = {}) => (
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
    },
  })
    .then(rejectErrors)
    .then(res => res.json())
)

export default { fetchJson, fetchUploadImage, removeToken }

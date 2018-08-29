import { createRequestThunk } from './action-helpers'
import api from 'api'
import { snackbarSet } from './snackbar-actions'

export const userRegisterKey = 'actionKeyRegisterUser'
export const userRegisterRequestKey = 'userRegisterRequestKey'
export const userLogoutKey = 'actionKeyLogoutUser'

export const userLogout = (user) => {
  return ({
    type: userLogoutKey
  })
}

const userRegister = (user) => {
  return ({
    type: userRegisterKey,
    payload: user
  })
}

export const userRegisterRequest = createRequestThunk({
  request: api.users.register,
  key: userRegisterRequestKey,
  success: [userRegister],
  failure: [(error) => snackbarSet(error)]
})

export const userLoginKey = 'actionKeyLoginUser'
export const keyLoginFailed = 'actionKeyLoginFailed'
export const userLoginRequestKey = 'userLoginRequestKey'

const userLogin = (user) => {
  return ({
    type: userLoginKey,
    payload: user
  })
}

const loginFailed = (error) => {
  return ({
    type: keyLoginFailed,
    payload: error
  })
}

export const userLoginRequest = createRequestThunk({
  request: api.users.login,
  key: userLoginRequestKey,
  success: [userLogin],
  failure: [loginFailed, (error) => snackbarSet(error.error, 'error')]
})

export const passwordUpdateKey = 'actionKeyUpdatePassword'
export const passwordUpdateRequestKey = 'passwordUpdateRequestKey'

const passwordUpdate = (password) => {
  return ({
    type: passwordUpdateKey,
    payload: password
  })
}

export const passwordUpdateRequest = createRequestThunk({
  request: api.users.update,
  key: passwordUpdateRequestKey,
  success: [passwordUpdate],
  failure: [(error) => snackbarSet(error)]
})

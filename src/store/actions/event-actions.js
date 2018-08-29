import { createRequestThunk, logError } from './action-helpers'
import api from 'api'
import { snackbarSet } from './snackbar-actions'
/* Dev */
// eslint-disable-next-line
import { orange } from 'logger'

// Create
export const eventCreateKey = 'actionKeyCreateEvent'
export const eventCreateRequestKey = 'eventCreateRequestKey'

export const eventCreate = (event) => {
  // orange('action.eventCreate: event', event)
  return ({
    type: eventCreateKey,
    payload: { event },
  })
}

export const eventCreateRequest = createRequestThunk({
  request: api.events.create,
  key: eventCreateRequestKey,
  success: [eventCreate, () => snackbarSet('Event added', 'success')],
  failure: [() => snackbarSet('Couldn\'t add note', 'warn')],
})

// Read
export const eventsReadKey = 'actionKeyReadEvents'
export const eventsReadRequestKey = 'eventsReadRequestKey'

export const eventsRead = (events) => {
  return ({
    type: eventsReadKey,
    payload: { events },
  })
}

export const eventsReadRequest = createRequestThunk({
  request: api.events.read,
  key: eventsReadRequestKey,
  success: [eventsRead, () => snackbarSet('Events loaded', 'success')],
  failure: [(error) => snackbarSet('Could not get events', 'error')]
})

// export const eventsReadRequest = (caller, ...rest) => {
//   orange('eventsReadRequest: caller', caller)
//   orange('rest', rest)
//   orange('arguments', arguments)
//   return createRequestThunk({
//     request: api.events.read,
//     key: eventsReadRequestKey,
//     success: [eventsRead, () => snackbarSet('Events loaded', 'success')],
//     failure: [(error) => snackbarSet('Could not get events', 'error')]
//   })
// }

// Patch
export const eventUpdateOneKey = 'eventUpdateOneKey'
export const eventUpdateOneRequestKey = 'eventUpdateOneRequestKey'

const eventUpdateOne = (data) => {
  // orange('event-actions.eventUpdateOne: event', event)
  return ({
    type: eventUpdateOneKey,
    payload: { data },
  })
}

export const eventUpdateOneRequest = createRequestThunk({
  request: api.events.patch,
  key: eventUpdateOneRequestKey,
  success: [eventUpdateOne, () => snackbarSet('Event updated', 'success')],
  failure: [error => logError(`Could not update event: ${error}`, 'error')]
})

// Delete
export const eventDeleteOneKey = 'keyDeletehOneEvent'
export const eventDeleteOneRequestKey = 'eventDeleteOneRequestKey'

const eventDeleteOne = (data) => {
  // orange('event-actions.eventDeleteOne: data', data)
  return ({
    type: eventDeleteOneKey,
    payload: data,
  })
}

export const eventDeleteOneRequest = createRequestThunk({
  request: api.events.delete,
  key: eventDeleteOneRequestKey,
  success: [eventDeleteOne, () => snackbarSet('Event deleted', 'success')],
  failure: [error => snackbarSet(`Could not delete event: ${error}`)]
})

// EventsUi
export const setEditIdKey = 'actionKeySetEdit_id'
export const editIdUnsetKey = 'actionKeyUnsetEdit_id'

export const editIdSet = (_id) => {
  // orange('event-actions.editIdSet: _id', _id)
  return ({
    type: setEditIdKey,
    payload: { _id }
  })
}

export const editIdUnset = () => {
  // orange('event-actions.editIdUnset')
  return ({
    type: editIdUnsetKey,
  })
}
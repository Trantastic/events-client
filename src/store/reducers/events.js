import { append, insert, merge, remove } from 'ramda'
import {
  eventCreateKey,
  eventDeleteOneKey,
  eventsReadKey,
  eventUpdateOneKey,
  editIdSetKey,
  editIdUnsetKey,
} from '../actions/event-actions'

/* Dev */
// eslint-disable-next-line
import { blue, red } from 'logger'

const indexOfObjectInArray = (arr, _id) => {
  return arr.findIndex(i => i._id === _id)
}

const updateEvent = (state, newEvent) => {
  const idx = indexOfObjectInArray(state, newEvent._id)
  const oldEvent = state[idx]
  const updatedEvent = merge(oldEvent, newEvent)
  const stateRemoved = remove(idx, 1, state)
  const newState = insert(idx, updatedEvent, stateRemoved)
  return newState
}

const deleteEvent = (state, payload) => {
  // blue('deleteEvent', payload)
  const _id = payload[0]._id
  const idx = indexOfObjectInArray(state, _id)
  const newState = remove(idx, 1, state)
  return newState
}

export const events = (state = [], { type, payload }) => {
  // blue('events reducer')
  try {
    switch (type) {
      case eventCreateKey:
        return append(payload.event[0], state)
      case eventsReadKey:
        return payload.events
      case eventUpdateOneKey:
        return updateEvent(state, payload.event)
      case eventDeleteOneKey:
        blue('events: payload', payload)
        return deleteEvent(state, payload.event)
      default:
        return state
    }
  }
  catch (e) {
    red(`reducers.events ${type}`, e)
  }
}

export const eventsUi = (state = {}, { type, payload }) => {
  switch (type) {
    case editIdSetKey:
      return merge(state, { edit_id: payload._id })
    case editIdUnsetKey:
      return ''
    default:
      return state
  }
}

export default { events, eventsUi }

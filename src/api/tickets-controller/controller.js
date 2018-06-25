import {
  success,
  notFound
} from '../../services/response/'
import {
  Priority,
  update
} from '../priority'
import {
  Normal
} from '../normal'
const NORMAL = 'NORMAL'
const PRIORITY = 'PRIORITY'
const models = {
  NORMAL: Normal,
  PRIORITY: Priority
}
const typeConf = {
  lastCalled: {},
  timesCalled: {
    normal: 0
  }
}
const typeHandler = () => {
  if (typeConf.timesCalled.normal === 2) {
    typeConf.timesCalled.normal = 0
    typeConf.lastCalled = PRIORITY
    return PRIORITY
  }
  typeConf.timesCalled.normal++

  return NORMAL
}

const setLatest = (ticket) => {
  Object.assign(typeConf.lastCalled, ticket)
}

const setStateOfLatest = (next) => {
  let last = typeConf.lastCalled
  let newState = {
    state: 'pending'
  }
  if (last['state'] === undefined) return

  switch (typeConf.lastCalled['state']) {
    case 'pending':
      newState.state = 'inProgress'
      break
    case 'inProgress':
      newState.state = 'completed'
  }

  models[typeConf.lastCalled].findById(last.id)
    .then(notFound(last))
    .then((priority) => priority ? Object.assign(priority, newState).save() : null)
    .then((priority) => priority ? priority.view(true) : null)
    .then(success(last))
    .catch(next)
}

export const index = ({
  querymen: {
    query,
    select,
    cursor
  }
}, res, next) => {
  setStateOfLatest(next)
  models[typeHandler()].findOne({
    state: 'pending'
  }).sort({
    created_at: -1
  }).then(notFound(res))
    .then((ticket) => ticket ? ticket.view() : null)
    .then(success(res))
    .catch(next)
  setLatest(res)
}

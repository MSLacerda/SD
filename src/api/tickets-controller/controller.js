import {
  success,
  notFound
} from '../../services/response/'
import {
  Ticket
} from '../tickets'
const NORMAL = 'normal'
const PRIORITY = 'priority'
const config = {
  counter: 0
}

const handlerResponse = (res) => (entity) => {
  console.log('ENTITY', entity)
  if (entity.type === NORMAL) config.counter++
  return entity
}
const composeFilter = () => {
  let filter = {}
  filter['state'] = 'pending'
  if (config.counter > 2) {
    config.counter = 0
    filter['type'] = PRIORITY
  }
  return filter
}

export const index = ({
  querymen: {
    query,
    select,
    cursor
  }
}, res, next) => {
  let filter = composeFilter()

  Ticket.count({filter})
    .then((response) => {
      if (parseInt(response) !== 0) {
        Ticket.findOneAndUpdate(
          filter,
          {$set: {state: 'called'}},
          { new: true }
        ).sort({
          created_at: 1
        }).then(notFound(res))
          .then(handlerResponse(res))
          .then((ticket) => ticket ? ticket.view() : null)
          .then(success(res))
          .catch(next)
      } else {
        Ticket.findOneAndUpdate(
          filter,
          {$set: {state: 'called'}},
          { new: true }
        ).sort({
          created_at: 1
        }).then(notFound(res))
          .then(handlerResponse(res))
          .then((ticket) => ticket ? ticket.view() : null)
          .then(success(res))
          .catch(next)
      }
    })
}

export const nextTicket = ({
  querymen: {
    query,
    select,
    cursor
  }
}, res, next) => {
  let filter = composeFilter()
  Ticket.findOne(
    filter
  ).sort({
    created_at: 1
  }).then(notFound(res))
    .then((ticket) => ticket ? ticket.view() : null)
    .then(success(res))
    .catch(next)
}

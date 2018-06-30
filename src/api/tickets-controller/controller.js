import * as moment from 'moment'
import {
  success,
  notFound
} from '../../services/response/'
import {
  Ticket
} from '../tickets'
import { io, logger } from '../../app';
const NORMAL = 'normal'
const PRIORITY = 'priority'
const config = {
  counter: 0
}

const handle = (res) => (entity) => {
  io.sockets.emit('show_actual_ticket', entity)
  if (entity != undefined && entity.ticket != undefined) {
    logger.info(' >>>>>> REQUISITANDO SENHA ====>  %s', entity.ticket)  


  }
  if (entity && entity.type === NORMAL) config.counter += 1
  return entity
}

async function hasPriorities () {
  return new Promise(resolve => {
    Ticket.count({type: PRIORITY, state: 'pending'}).then((res) => {
      return resolve(res)
    })
  })
}

const isPriority = () => {
  if (config.counter >= 2) {
    return true
  }
  return false
}

const composeFilter = (onlyRead) => {
  return new Promise(resolve => {
    let filter = {}
    hasPriorities().then(response => {
      if (isPriority() && response > 0) {
        filter.state = 'pending'
        filter.type = PRIORITY
        if (!onlyRead) {
          // Modifications here
          config.counter = 0
        }
      } else {
        filter.state = 'pending'
      }


      return resolve(filter)
    })
  })
}

export const index = ({
  querymen: {
    query,
    select,
    cursor
  }
}, res, next) => {
  composeFilter(false).then((filter) => {
    Ticket.findOneAndUpdate(
      filter,
      {$set: {state: 'called'}},
      {new: true}
    ).sort({created_at: 1})
      .then(notFound(res))
      .then(handle(res))
      .then(success(res))
      .catch(next)
  })
}

export const nextTicket = ({
  querymen: {
    query,
    select,
    cursor
  }
}, res, next) => {
  composeFilter(true).then(filter => {
    Ticket.findOne(
      filter
    ).sort({
      created_at: 1
    }).then(notFound(res))
      .then((ticket) => ticket ? ticket.view() : null)
      .then(success(res))
      .catch(next)
  })
}

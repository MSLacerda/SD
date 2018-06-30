import { success, notFound } from '../../services/response/'
import { Ticket } from '.'
import { logger } from '../../app'

export const createNormal = ({ bodymen: { body } }, res, next) => {
  Ticket.count({type: 'normal'})
    .then((response) => {
      let ticket = {
        ticket: 'N'.concat(parseInt(response) + 1),
        type: 'normal',
        state: 'pending'
      }
      logger.info(' >>>>>> CRIADO SENHA NORMAL ====>  %s', ticket.ticket)  
      Ticket.create(ticket)
        .then((ticket) => ticket.view(true))
        .then(success(res, 201))
        .catch(next)
    })
}


export const createPriority = ({ bodymen: { body } }, res, next) => {
  Ticket.count({type: 'priority'})
    .then((response) => {
      let ticket = {
        ticket: 'P'.concat(parseInt(response) + 1),
        type: 'priority',
        state: 'pending'
      }
      logger.info(' >>>>>> CRIADO SENHA COM PRIORIDADE ====>  %s', ticket.ticket)              
      Ticket.create(ticket)
        .then((ticket) => ticket.view(true))
        .then(success(res, 201))
        .catch(next)
    })
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Ticket.count(query)
    .then(count => Ticket.find(query, select, cursor)
      .then((tickets) => ({
        count,
        rows: tickets.map((ticket) => ticket.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Ticket.findById(params.id)
    .then(notFound(res))
    .then((ticket) => ticket ? ticket.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Ticket.findById(params.id)
    .then(notFound(res))
    .then((ticket) => ticket ? Object.assign(ticket, body).save() : null)
    .then((ticket) => ticket ? ticket.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Ticket.findById(params.id)
    .then(notFound(res))
    .then((ticket) => ticket ? ticket.remove() : null)
    .then(success(res, 204))
    .catch(next)

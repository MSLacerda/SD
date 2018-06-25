import { success, notFound } from '../../services/response/'
import { Priority } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Priority.create(body)
    .then((priority) => priority.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Priority.count(query)
    .then(count => Priority.find(query, select, cursor)
      .then((priorities) => ({
        count,
        rows: priorities.map((priority) => priority.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Priority.findById(params.id)
    .then(notFound(res))
    .then((priority) => priority ? priority.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Priority.findById(params.id)
    .then(notFound(res))
    .then((priority) => priority ? Object.assign(priority, body).save() : null)
    .then((priority) => priority ? priority.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Priority.findById(params.id)
    .then(notFound(res))
    .then((priority) => priority ? priority.remove() : null)
    .then(success(res, 204))
    .catch(next)

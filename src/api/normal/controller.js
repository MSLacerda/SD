import { success, notFound } from '../../services/response/'
import { Normal } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Normal.create(body)
    .then((normal) => normal.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Normal.count(query)
    .then(count => Normal.find(query, select, cursor)
      .then((normals) => ({
        count,
        rows: normals.map((normal) => normal.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Normal.findById(params.id)
    .then(notFound(res))
    .then((normal) => normal ? normal.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Normal.findById(params.id)
    .then(notFound(res))
    .then((normal) => normal ? Object.assign(normal, body).save() : null)
    .then((normal) => normal ? normal.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Normal.findById(params.id)
    .then(notFound(res))
    .then((normal) => normal ? normal.remove() : null)
    .then(success(res, 204))
    .catch(next)

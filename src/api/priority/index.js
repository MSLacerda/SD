import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Priority, { schema } from './model'

const router = new Router()
const { state } = schema.tree

/**
 * @api {post} /priorities Create priority
 * @apiName CreatePriority
 * @apiGroup Priority
 * @apiParam state Priority's state.
 * @apiSuccess {Object} priority Priority's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Priority not found.
 */
router.post('/',
  body({ state }),
  create)

/**
 * @api {get} /priorities Retrieve priorities
 * @apiName RetrievePriorities
 * @apiGroup Priority
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of priorities.
 * @apiSuccess {Object[]} rows List of priorities.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /priorities/:id Retrieve priority
 * @apiName RetrievePriority
 * @apiGroup Priority
 * @apiSuccess {Object} priority Priority's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Priority not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /priorities/:id Update priority
 * @apiName UpdatePriority
 * @apiGroup Priority
 * @apiParam state Priority's state.
 * @apiSuccess {Object} priority Priority's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Priority not found.
 */
router.put('/:id',
  body({ state }),
  update)

/**
 * @api {delete} /priorities/:id Delete priority
 * @apiName DeletePriority
 * @apiGroup Priority
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Priority not found.
 */
router.delete('/:id',
  destroy)

export default router

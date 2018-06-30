import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { createNormal, createPriority, index, show, update, destroy, downloadFile } from './controller'
import { schema } from './model'
export Ticket, { schema } from './model'

const router = new Router()
const { state } = schema.tree

/**
 * @api {post} /tickets/normal Create Normal Ticket
 * @apiName CreateNormal
 * @apiGroup Normal
 * @apiParam state Normal's state.
 * @apiSuccess {Object} normal Normal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Normal not found.
 */
router.post('/normal',
  body({ state }),
  createNormal)

/**
 * @api {post} /tickets/normal Create Priority Ticket
 * @apiName createPriority
 * @apiGroup Ticket
 * @apiParam state Ticket's state.
 * @apiSuccess {Object} Ticket Ticket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticket not found.
 */

router.post('/priority',
  body({ state }),
  createPriority)

/**
 * @api {get} /Tickets Retrieve Tickets
 * @apiName RetrieveTickets
 * @apiGroup Normal
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of Tickets.
 * @apiSuccess {Object[]} rows List of Tickets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /Tickets/:id Retrieve normal
 * @apiName RetrieveNormal
 * @apiGroup Normal
 * @apiSuccess {Object} normal Normal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Normal not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /Tickets/:id Update normal
 * @apiName UpdateNormal
 * @apiGroup Normal
 * @apiParam state Normal's state.
 * @apiSuccess {Object} normal Normal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Normal not found.
 */
router.put('/:id',
  body({ state }),
  update)

/**
 * @api {delete} /Tickets/:id Delete normal
 * @apiName DeleteNormal
 * @apiGroup Normal
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Normal not found.
 */
router.delete('/:id',
  destroy)


export default router

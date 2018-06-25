import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Normal, { schema } from './model'

const router = new Router()
const { state } = schema.tree

/**
 * @api {post} /normals Create normal
 * @apiName CreateNormal
 * @apiGroup Normal
 * @apiParam state Normal's state.
 * @apiSuccess {Object} normal Normal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Normal not found.
 */
router.post('/',
  body({ state }),
  create)

/**
 * @api {get} /normals Retrieve normals
 * @apiName RetrieveNormals
 * @apiGroup Normal
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of normals.
 * @apiSuccess {Object[]} rows List of normals.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /normals/:id Retrieve normal
 * @apiName RetrieveNormal
 * @apiGroup Normal
 * @apiSuccess {Object} normal Normal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Normal not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /normals/:id Update normal
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
 * @api {delete} /normals/:id Delete normal
 * @apiName DeleteNormal
 * @apiGroup Normal
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Normal not found.
 */
router.delete('/:id',
  destroy)

export default router

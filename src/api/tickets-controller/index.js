import {
  Router
} from 'express'
import {
  middleware as query
} from 'querymen'

import {
  index
} from './controller'

const router = new Router()

router.get('/',
  query(), index)

export default router

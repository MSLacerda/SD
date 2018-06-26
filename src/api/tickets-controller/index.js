import {
  Router
} from 'express'
import {
  middleware as query
} from 'querymen'

import {
  index,
  nextTicket
} from './controller'

const router = new Router()

router.get('/call',
  query(), index)

router.get('/next',
  query(), nextTicket)

export default router

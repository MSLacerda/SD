import { Router } from 'express'
import { logger } from '../app'
import fs from 'fs'
import tickets from './tickets'
import ticketsController from './tickets-controller'
const winston = require('winston')
const router = new Router()

router.use('/tickets', tickets)
router.use('/tickets-controllers', ticketsController)

router.get('/log', (req, res) => {
    const file = 'combined.log';
    res.download(file); // Set disposition and send it.0
})

router.get('/clearlog', (req, res) => {
    fs.truncate('combined.log', '', ()=> {
    	res.status(200).send()
    })
})

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

export default router

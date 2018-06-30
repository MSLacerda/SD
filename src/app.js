import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import path from 'path'
import api from './api'
import fs from 'fs'
const { createLogger, format, transports }  = require('winston');
const terminal = require('web-terminal')
const io = require('socket.io')()
const app = express(apiRoot, api)
const server = http.createServer(app)
const logger = createLogger({
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ]
});


 

io.on('connection', (client) => {
  client.on('setNext', (data) => {
    setTimeout(() => {
      io.sockets.emit('receivenext', data)
    }, 1000)
  })
})

mongoose.connect(mongo.uri)
mongoose.Promise = Promise
mongoose.set('debug', false)

setImmediate(() => {
  io.listen(server)

  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export {
  app,
  io,
  logger
} 
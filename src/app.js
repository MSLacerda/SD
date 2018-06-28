import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
const io = require('socket.io')()
const app = express(apiRoot, api)
const server = http.createServer(app)

io.on('connection', (client) => {
  client.on('setNext', (data) => {
    setTimeout(() => {
      io.sockets.emit('receivenext', data)
    }, 1000)
  })
})

mongoose.connect(mongo.uri)
mongoose.Promise = Promise

setImmediate(() => {
  io.listen(server)

  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export {
  app,
  io
} 
import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Priority } from '.'

const app = () => express(apiRoot, routes)

let priority

beforeEach(async () => {
  priority = await Priority.create({})
})

test('POST /priorities 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ state: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.state).toEqual('test')
})

test('GET /priorities 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /priorities/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${priority.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(priority.id)
})

test('GET /priorities/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /priorities/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${priority.id}`)
    .send({ state: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(priority.id)
  expect(body.state).toEqual('test')
})

test('PUT /priorities/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ state: 'test' })
  expect(status).toBe(404)
})

test('DELETE /priorities/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${priority.id}`)
  expect(status).toBe(204)
})

test('DELETE /priorities/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

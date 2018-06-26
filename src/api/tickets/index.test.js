import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Normal } from '.'

const app = () => express(apiRoot, routes)

let normal

beforeEach(async () => {
  normal = await Normal.create({})
})

test('POST /normals 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ state: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.state).toEqual('test')
})

test('GET /normals 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /normals/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${normal.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(normal.id)
})

test('GET /normals/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /normals/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${normal.id}`)
    .send({ state: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(normal.id)
  expect(body.state).toEqual('test')
})

test('PUT /normals/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ state: 'test' })
  expect(status).toBe(404)
})

test('DELETE /normals/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${normal.id}`)
  expect(status).toBe(204)
})

test('DELETE /normals/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

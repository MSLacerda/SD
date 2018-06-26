import { Normal } from '.'

let normal

beforeEach(async () => {
  normal = await Normal.create({ state: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = normal.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(normal.id)
    expect(view.state).toBe(normal.state)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = normal.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(normal.id)
    expect(view.state).toBe(normal.state)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

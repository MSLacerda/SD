import { Priority } from '.'

let priority

beforeEach(async () => {
  priority = await Priority.create({ state: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = priority.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(priority.id)
    expect(view.state).toBe(priority.state)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = priority.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(priority.id)
    expect(view.state).toBe(priority.state)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

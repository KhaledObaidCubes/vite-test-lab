import { Rectangle } from "./__tests__/demo_shape_controller/control/rectangle"

//import { describe, test, expect } from 'vitest'
const rect = new Rectangle(30, 30)
describe("external file two", () => {
  test("rectangle is Square test", () => {
    expect(rect.isSquare()).toBe(true)
  })
})

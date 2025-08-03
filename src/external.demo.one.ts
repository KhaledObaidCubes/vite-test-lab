import { Rectangle } from "./__tests__/demo_shape_controller/control/rectangle"
//import { describe, test, expect } from 'vitest'
const rect = new Rectangle(20, 30)
describe("external demo one", () => {
  test("rectangle is Square test", () => {
    expect(rect.perimeter()).toBe(100)
  })
})

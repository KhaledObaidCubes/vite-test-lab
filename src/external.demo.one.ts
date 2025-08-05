import { Rectangle } from "./app/domain/classes/rectangle";

//import { describe, test, expect } from 'vitest'
const rect = new Rectangle(20, 30);
describe("external demo one", () => {
  test("rectangle is Square test", () => {
    expect(rect.perimeter()).toBe(100);
  });
  test("rectangle is Square test", () => {
    expect(rect.isSquare()).toBe(true);
  });
});

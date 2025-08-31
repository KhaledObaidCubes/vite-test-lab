import { Rectangle } from "../app/domain/classes/rectangle";
import { Triangle } from "../app/domain/classes/triangle";

//import { describe, test, expect } from 'vitest'
const tri = new Triangle(2, 6);
const rect = new Rectangle(2, 5);
describe("File II start test", () => {
  test("test Rectangle area method", () => {
    expect(rect.area()).toBe(10);
  });
  test("test Triangle area method", () => {
    expect(tri.area()).toBe(6);
  });
  test("test Triangle type method", () => {
    expect(tri.triangleType()).toBe("unknown");
  });
  test("test new Triangle type method", () => {
    const tri2 = new Triangle(5, 5);
    expect(tri2.triangleType()).toBe("unknown");
  });
});

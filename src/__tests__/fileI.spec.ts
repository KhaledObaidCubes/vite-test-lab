import { Rectangle } from "./demo_shape_controller/control/rectangle";
import { Triangle } from "./demo_shape_controller/control/triangle";
import { List } from "./demo_shape_controller/control/list";
//import type { listItem } from "./demo_shape_controller/contract/listItem";

//import { describe, test, expect,vi,it } from 'vitest'

const myList = [
  {
    name: "AAA",
    children: [
      { name: "aaa1" },
      { name: "aaa2", children: [{ name: "aaa21" }, { name: "aaa22" }] },
      { name: "aaa3" },
    ],
  },
  {
    name: "BBB",
    children: [{ name: "bbb1" }, { name: "aaa1" }, { name: "aaa1" }],
  },
];
const list = new List(myList);
console.log(list.htmlText());

const tri = new Triangle(2, 2);
const rect = new Rectangle(2, 2);
describe("File I spec start test", () => {
  test("test Rectangle area method", () => {
    expect(rect.area()).toBe(4);
  });
  test("test Rectangle area method", () => {
    expect(tri.area()).toBe(4 / 2);
  });
  it("it should log the rect name and its information like width and height", () => {
    const spy = vi.spyOn(console, "log");
    const msg = "Lucky luke";
    rect.infoLogger(msg);
    expect(spy).toHaveBeenCalledWith(
      `my rect ${msg} have widht= ${rect.width}\nand have height= ${rect.height}`
    );
    spy.mockRestore();
  });
  test('mockApiRequest returns correct mock value', async () => {
    const result = await rect.mockApiRequest()
    expect(result).toBe('Mock response after...')
  })
});

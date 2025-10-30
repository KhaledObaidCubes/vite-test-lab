import { numSum } from "@/app/helpers/common";

it("dynamic args function", () => {
  expect(numSum(89, 4, 5, 1, 99)).toBe(198);
});

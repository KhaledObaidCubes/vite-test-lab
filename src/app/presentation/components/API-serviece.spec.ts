import {
  delayedSum,
  fetchPersonsII,
} from "../../domain/classes/service-mocker";

describe("", () => {
  it("should return an array of persons from the API", async () => {
    const people = await fetchPersonsII(10); // use shorter delay for test

    expect(Array.isArray(people)).toBe(true);
    expect(people.length).toBeGreaterThan(0);
    console.log(people);

    expect(people[0]).toHaveProperty("firstName");
  }); // Allow extra time for the async call

  test("testing the delay function using await", async () => {
    await expect(delayedSum(9, 5)).resolves.toBe(14);
  });
  test("resolve await manually", async () => {
    const result = await delayedSum(5, 5);
    expect(result).toBe(10);
  });
});

import { delayedSum, fetchPersons } from "../../domain/classes/service-mocker";

describe("", () => {
  it("should return an array of persons from the API", async () => {
    const people = await fetchPersons(10); // use shorter delay for test

    expect(Array.isArray(people.data)).toBe(true);
    expect(people.data.length).toBeGreaterThan(0);
    console.log(people);

    expect(people.data[0]).toHaveProperty("firstName");
  }); // Allow extra time for the async call

  test("testing the delay function using await", async () => {
    await expect(delayedSum(9, 5)).resolves.toBe(14);
  });
  test("resolve await manually", async () => {
    const result = await delayedSum(5, 5);
    expect(result).toBe(10);
  });
});

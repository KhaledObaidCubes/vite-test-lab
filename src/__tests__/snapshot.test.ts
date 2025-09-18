import ListController from "@app/domain/classes/list-controller";

const listController = new ListController();

describe("getFullName", () => {
  it("matches snapshot", () => {
    const person = { firstName: "Khaled", lastName: "Qad" };
    const result = listController.getFullNameSS(
      person.firstName,
      person.lastName
    );

    expect(result).toMatchSnapshot();
  });
});

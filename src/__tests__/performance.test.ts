import EditUserController from "@app/domain/classes/edit-user-controller";

const editUserController = new EditUserController();
it("get data with delay", async () => {
  const result = await editUserController.getDataWithDelay("9", 200);
  expect(result.address.country).toEqual("Jordan");
});

import EditUserController from "@app/domain/classes/edit-user-controller";

const editUserController = new EditUserController();
it("get data with delay", async () => {
  const result = await editUserController.getDataWithDelay("11", 200);
  console.log(result);

  expect(result.address.country).toEqual("Jordan");
});

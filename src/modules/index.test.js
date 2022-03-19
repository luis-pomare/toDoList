import domObject from "./readDom.js";

test("domObject", () => {
  expect(domObject.taskInput.id).toBe("taskInput");
});

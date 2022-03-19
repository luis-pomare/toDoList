const storageNewElement = require("./index.js");

describe("Add function", () => {
  expect(storageNewElement("make breackfast", false, 3)).toBE({
    description: "make breackfast",
    checked: false,
    index: 3,
  });
});

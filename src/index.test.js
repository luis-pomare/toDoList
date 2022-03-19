const storageNewElement = require("./index.js");
const { default: renderElement } = require("./modules/itemFunctions.js");

describe("Add function", () => {
  expect(storageNewElement("make breackfast", false, 3)).toBE({
    description: "make breackfast",
    checked: false,
    index: 3,
  });
});

describe("Remove function", () => {
  expect(renderElement("make breackfast", false, 3)).toBE(
    `
      <li class="flexItem">
        <span class="checked">
          <input type="checkbox" class="checkbox" data-index=3 checked=true>
          <p data-index=3>make breackfast</p>
        </span>
        <span>
        <i class="fa-solid fa-trash-can" data-index=${index}></i>
        </span>
      </li>      
    `
  );
});

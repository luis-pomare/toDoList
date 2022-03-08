import "./style.css";
let list = [];
class Item {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const item1 = new Item("Init package.JSON", true, 0);
const item2 = new Item("Install webpack", true, 1);
const item3 = new Item("Install dependencies", true, 2);
const item4 = new Item("Configure src files", false, 3);

function addItem(item) {
  let index = item.index;
  list[index] = item;
}

addItem(item1);
addItem(item2);
addItem(item3);
addItem(item4);

console.log(list);

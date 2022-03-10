import "./style.css";

const list = [];
const ul = document.getElementById("listContainer");
class Item {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const item1 = new Item("Init package.JSON", true, 3);
const item2 = new Item("Install webpack", true, 1);
const item3 = new Item("Install dependencies", true, 2);
const item4 = new Item("Configure src files", false, 0);

function addItem(item) {
  const { index } = item;
  list[index] = item;
}

addItem(item1);
addItem(item2);
addItem(item3);
addItem(item4);

function renderList(list) {
  for (let i = 0; i < list.length; i += 1) {
    const li = document.createElement("li");
    li.innerHTML = `
    <span>
    <input type="checkbox">
    <p contenteditable="true">${list[i].description}</p>
    </span>
    <span id="menuContainer${list[i].index}">
    <i class="fa-solid fa-ellipsis-vertical" id="menuIcon${list[i].index}"></i>
    </span>
    `;
    li.classList.add("flexItem");
    ul.appendChild(li);
    let menuIcon = document.getElementById(`menuIcon${list[i].index}`); // Current menu icon
    let menuContainer = document.getElementById(
      `menuContainer${list[i].index}`
    );
    menuIcon.addEventListener("click", () => {
      menuContainer.innerHTML = `
      <i class="fa-solid fa-grip-lines"></i>
      <i class="fa-solid fa-trash-can"></i>
      <i class="fa-solid fa-pencil"></i>
      `;
    });
  }
}

renderList(list);

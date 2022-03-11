import "./style.css";

const list = [];
let counter = 0;
let taskInput = document.getElementById("taskInput");

if (JSON.parse(localStorage.getItem("listArray")) !== null) {
  list = JSON.parse(localStorage.getItem("listArray"));
  counter = list.length;
}

const ul = document.getElementById("listContainer");
class Item {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const item1 = new Item("Init package.JSON", false, 0);
const item2 = new Item("Install webpack", false, 1);
const item3 = new Item("Install dependencies", false, 2);
const item4 = new Item("Configure src files", false, 3);

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
      <i id="drag${list[i].index}" class="fa-solid fa-grip-lines"></i>
      <i id="erase${list[i].index}" class="fa-solid fa-trash-can"></i>
      <i id="edit${list[i].index}" class="fa-solid fa-pencil"></i>
      `;
      let drag = document.getElementById(`drag${list[i].index}`);
      let erase = document.getElementById(`erase${list[i].index}`);
      let edit = document.getElementById(`edit${list[i].index}`);
      erase.addEventListener("click", () => {});
    });
  }
}

// addButton.addEventListener("click", () => {
//   if (bookInput.value !== "" && authorInput.value !== "") {
//     newBook();
//     renderCollection();
//     clearInputs();
//   }
// });

renderList(list);

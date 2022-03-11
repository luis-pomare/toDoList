import "./style.css";
let taskInput = document.getElementById("taskInput");
const enterIcon = document.getElementById("enterIcon");
const ul = document.getElementById("listContainer");

let list = [];
let counter = 0;

if (JSON.parse(localStorage.getItem("listArray")) !== null) {
  list = JSON.parse(localStorage.getItem("listArray"));
  counter = list.length;
}

class Item {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

function renderList() {
  ul.innerHTML = "";
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

function clearInput() {
  taskInput.value = "";
}

enterIcon.addEventListener("click", () => {
  if (taskInput.value !== "") {
    list[counter] = new Item(taskInput.value, false, counter);
    localStorage.setItem("listArray", JSON.stringify(list));
    counter += 1;
    renderList();
    clearInput();
  }
});

renderList();

import "./style.css";
import domObject from "./modules/readDom.js";
import renderElement from "./modules/itemFunctions.js";

let list = [];
let index = 0;

if (JSON.parse(localStorage.getItem("listArray")) !== null) {
  list = JSON.parse(localStorage.getItem("listArray"));
  index = list.length;
}

class Item {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

function updateLocal() {
  localStorage.setItem("listArray", JSON.stringify(list));
}
// To clear the input field each time the enter button is clicked
function clearInput() {
  domObject.taskInput.value = "";
}

function storageNewElement() {
  const element = new Item(domObject.taskInput.value, false, index);
  list.push(element);
  index += 1;
  updateLocal();
  return element;
}

domObject.enterIcon.addEventListener("click", () => {
  if (domObject.taskInput.value !== "") {
    renderElement(domObject.taskInput.value, index, false);
    storageNewElement();
    clearInput();
  }
});

function renderList() {
  domObject.ul.innerHTML = "";
  for (let i = 0; i < list.length; i += 1) {
    renderElement(list[i].description, list[i].index, list[i].completed);
  }
}

// Initial rendering
renderList();

function clearCompleted() {
  list = list.filter((item) => item.completed === false);
  index = list.length;
  for (let i = 0; i < index; i += 1) {
    list[i].index = i;
  }
  updateLocal();
  renderList();
}

domObject.clearCompletedButton.addEventListener("click", () => {
  clearCompleted();
});

domObject.ul.addEventListener("click", (e) => {
  if (e.target) {
    if (e.target.type === "checkbox") {
      e.target.parentElement.classList.toggle("checked");
      list[e.target.dataset.index].completed = e.target.checked;
      updateLocal();
    }
    if (e.target.tagName === "I") {
      const numericIndex = Number(e.target.dataset.index);
      list = list.filter((item) => item.index !== numericIndex);
      index = list.length;
      for (let i = 0; i < index; i += 1) {
        list[i].index = i;
      }
      updateLocal();
      renderList();
    }
    if (e.target.tagName === "P") {
      e.target.innerHTML = `<input type=text data-index=${e.target.dataset.index} >`;
    }
  }
});

domObject.ul.addEventListener("change", (e) => {
  if (e.target.type === "text") {
    e.target.parentElement.innerHTML = `<p>${e.target.value}</p>`;
    list[e.target.dataset.index].description = e.target.value;
    updateLocal();
  }
});

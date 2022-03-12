import "./style.css";

const taskInput = document.getElementById("taskInput");
const enterIcon = document.getElementById("enterIcon");
let ul = document.getElementById("listContainer");
const clearCompletedButton = document.getElementById("clearCompleted");

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

// To clear the input field each time the enter button is clicked
function clearInput() {
  taskInput.value = "";
}

function renderElement(description = taskInput.value, index) {
  const element = `
      <li class="flexItem">
        <span>
          <input type="checkbox" class="checkbox" data-index=${index}>
          <p>${description}</p>
        </span>
        <span>
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </span>
      </li>      
    `;
  ul.innerHTML += element;
}

function storageElement() {
  const element = new Item(taskInput.value, false, index);
  list.push(element);
  index += 1;
  localStorage.setItem("listArray", JSON.stringify(list));
}

enterIcon.addEventListener("click", () => {
  if (taskInput.value !== "") {
    renderElement(taskInput.value, index);
    storageElement();
    clearInput();
  }
});

function renderList() {
  ul.innerHTML = "";
  for (let element of list) {
    renderElement(element.description, element.index);
  }
}

// Initial rendering
renderList();

function clearCompleted() {
  list = list.filter((item) => item.completed === true);
  index = list.length;
  for (let i = 0; i < index; i += 1) {
    list[i].index = i;
  }
  localStorage.setItem("listArray", JSON.stringify(list));
  renderList();
}

clearCompletedButton.addEventListener("click", () => {
  clearCompleted();
});

ul.addEventListener("click", (e) => {
  if (e.target) {
    if (e.target.type === "checkbox") {
      e.target.parentElement.classList.toggle("checked");
    }
  }
});

import "./style.css";

const taskInput = document.getElementById("taskInput");
const enterIcon = document.getElementById("enterIcon");
let ul = document.getElementById("listContainer");
const clearCompletedButton = document.getElementById("clearCompleted");

let list = [];

if (JSON.parse(localStorage.getItem("listArray")) !== null) {
  list = JSON.parse(localStorage.getItem("listArray"));
}

class Item {
  constructor(description, completed) {
    this.description = description;
    this.completed = completed;
  }
}

// To clear the input field each time the enter button is clicked
function clearInput() {
  taskInput.value = "";
}

function renderElement() {
  const element = `
      <li class="flexItem">
        <span>
          <input type="checkbox" class="checkbox" />
          <p contenteditable="true">${taskInput.value}</p>
        </span>
        <span>
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </span>
      </li>      
    `;
  ul.innerHTML += element;
}

function storageElement() {
  const element = new Item(taskInput.value, false);
  list.push(element);
  localStorage.setItem("listArray", JSON.stringify(list));
}

enterIcon.addEventListener("click", () => {
  if (taskInput.value !== "") {
    renderElement();
    storageElement();
    clearInput();
  }
});

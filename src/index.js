import "./style.css";

const taskInput = document.getElementById("taskInput");
const enterIcon = document.getElementById("enterIcon");
const ul = document.getElementById("listContainer");
const clearCompletedButton = document.getElementById("clearCompleted");

let list = [];

if (JSON.parse(localStorage.getItem("listArray")) !== null) {
  list = JSON.parse(localStorage.getItem("listArray"));
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

enterIcon.addEventListener("click", () => {
  if (taskInput.value !== "") {
    const element = `
      <li>
        <input type="checkbox" class="checkbox">
      </li>
    `;
  }
});

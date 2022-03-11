import './style.css';

const taskInput = document.getElementById('taskInput');
const enterIcon = document.getElementById('enterIcon');
const ul = document.getElementById('listContainer');
const clearCompletedButton = document.getElementById('clearCompleted');

let list = [];
let counter = 0;

if (JSON.parse(localStorage.getItem('listArray')) !== null) {
  list = JSON.parse(localStorage.getItem('listArray'));
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
  ul.innerHTML = '';
  for (let i = 0; i < list.length; i += 1) {
    const li = document.createElement('li');
    li.innerHTML = `
    <span>
    <input id="check${list[i].index}" type="checkbox" class="checkbox">
    <p contenteditable="true">${list[i].description}</p>
    </span>
    <span id="menuContainer${list[i].index}">
    <i class="fa-solid fa-ellipsis-vertical" id="menuIcon${list[i].index}"></i>
    </span>
    `;
    li.classList.add('flexItem');
    ul.appendChild(li);
    const menuIcon = document.getElementById(`menuIcon${list[i].index}`); // Current menu icon
    const menuContainer = document.getElementById(
      `menuContainer${list[i].index}`,
    );
    menuIcon.addEventListener('click', () => {
      menuContainer.innerHTML = `
      <i id="erase${list[i].index}" class="fa-solid fa-trash-can"></i>
      `;
      const erase = document.getElementById(`erase${list[i].index}`);
      erase.addEventListener('click', () => {
        list = list.filter((item) => item.index !== list[i].index);
        counter = list.length;
        for (let i = 0; i < counter; i += 1) {
          list[i].index = i;
        }
        localStorage.setItem('listArray', JSON.stringify(list));
        renderList();
      });
    });
    const check = document.getElementById(`check${list[i].index}`);
    check.checked = list[i].completed;
    check.addEventListener('click', () => {
      list[list[i].index].completed = check.checked;
      localStorage.setItem('listArray', JSON.stringify(list));
      if (check.checked) {
        li.classList.add('checked');
      }
      if (!check.checked) {
        li.classList.remove('checked');
      }
    });
    if (check.checked) {
      li.classList.add('checked');
    }
    if (!check.checked) {
      li.classList.remove('checked');
    }
  }
}

function clearInput() {
  taskInput.value = '';
}

enterIcon.addEventListener('click', () => {
  if (taskInput.value !== '') {
    list[counter] = new Item(taskInput.value, false, counter);
    localStorage.setItem('listArray', JSON.stringify(list));
    counter += 1;
    renderList();
    clearInput();
  }
});

function clearCompleted() {
  list = list.filter((item) => item.completed === false);
  counter = list.length;
  for (let i = 0; i < counter; i += 1) {
    list[i].index = i;
  }
  localStorage.setItem('listArray', JSON.stringify(list));
  renderList();
}

clearCompletedButton.addEventListener('click', () => {
  clearCompleted();
});

renderList();

import './style.css';

const taskInput = document.getElementById('taskInput');
const enterIcon = document.getElementById('enterIcon');
const ul = document.getElementById('listContainer');
const clearCompletedButton = document.getElementById('clearCompleted');

let list = [];
let index = 0;

if (JSON.parse(localStorage.getItem('listArray')) !== null) {
  list = JSON.parse(localStorage.getItem('listArray'));
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
  taskInput.value = '';
}

function renderElement(description, index, checked) {
  let isChecked = '';
  let checkedClass = '';
  if (checked === true) {
    isChecked = 'checked=true';
    checkedClass = 'checked';
  }
  const element = `
      <li class="flexItem">
        <span class="${checkedClass}">
          <input type="checkbox" class="checkbox" data-index=${index} ${isChecked}>
          <p data-index=${index}>${description}</p>
        </span>
        <span>
        <i class="fa-solid fa-trash-can" data-index=${index}></i>
        </span>
      </li>      
    `;
  ul.innerHTML += element;
}

function storageNewElement() {
  const element = new Item(taskInput.value, false, index);
  list.push(element);
  index += 1;
  localStorage.setItem('listArray', JSON.stringify(list));
}

enterIcon.addEventListener('click', () => {
  if (taskInput.value !== '') {
    renderElement(taskInput.value, index, false);
    storageNewElement();
    clearInput();
  }
});

function renderList() {
  ul.innerHTML = '';
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
  localStorage.setItem('listArray', JSON.stringify(list));
  renderList();
}

clearCompletedButton.addEventListener('click', () => {
  clearCompleted();
});

ul.addEventListener('click', (e) => {
  if (e.target) {
    if (e.target.type === 'checkbox') {
      e.target.parentElement.classList.toggle('checked');
      list[e.target.dataset.index].completed = e.target.checked;
      localStorage.setItem('listArray', JSON.stringify(list));
    }
    if (e.target.tagName === 'I') {
      const numericIndex = Number(e.target.dataset.index);
      list = list.filter((item) => item.index !== numericIndex);
      index = list.length;
      for (let i = 0; i < index; i += 1) {
        list[i].index = i;
      }
      localStorage.setItem('listArray', JSON.stringify(list));
      renderList();
    }
    if (e.target.tagName === 'P') {
      e.target.innerHTML = `<input type=text data-index=${e.target.dataset.index} >`;
    }
  }
});

ul.addEventListener('change', (e) => {
  if (e.target.type === 'text') {
    e.target.parentElement.innerHTML = `<p>${e.target.value}</p>`;
    list[e.target.dataset.index].description = e.target.value;
    localStorage.setItem('listArray', JSON.stringify(list));
  }
});

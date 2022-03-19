import domObject from './readDom.js';

const renderElement = function (description, index, checked) {
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
  domObject.ul.innerHTML += element;
  return element;
};

export default renderElement;

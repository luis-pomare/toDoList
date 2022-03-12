// Dom elements object
class DomObject {
  // Read elements from document
  taskInput = document.getElementById("taskInput");
  enterIcon = document.getElementById("enterIcon");
  ul = document.getElementById("listContainer");
  clearCompletedButton = document.getElementById("clearCompleted");
}
const domObject = new DomObject();
export default domObject;

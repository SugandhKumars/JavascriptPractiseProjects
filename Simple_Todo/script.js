const app = document.getElementById("app");
const Input = getInput();
const Button = getButton();
const container = TodoContainer();
app.append(Input);
app.append(Button);
app.append(container);
let id = 1;
init();
function init() {
  let allTodos = getTodo();
  allTodos.map((todo) => createTodo(todo, true));

  if (allTodos?.length) {
    id = allTodos.at(0).id + 1;
  }
}
function handleEvent(e) {
  if (e.key === "Enter") {
    handleAddTodo();
  }
}
function handleAddTodo() {
  let value = Input.value;
  if (!value) {
    alert("Please Add a value");
    return;
  }
  let taskObj = { task: value, id: id++ };
  createTodo(taskObj);
  saveToLocal(taskObj);
  Input.value = "";
}

function handleTodoClick(e) {
  let id = e.target.id;
  const element = document.getElementById(id);
  element.contentEditable = true;
  element.addEventListener("keypress", handleEdit);
}
function handleEdit(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    console.log("Key");
    const element = document.getElementById(e.target.id);
    const updateText = element.innerText;
    update(e.target.id, updateText);
    element.contentEditable = false;
  }
}
function update(id, text) {
  let allTask = getTodo();
  allTask = allTask.map((task) => {
    if (task.id == id) {
      task.task = text;
    }
    return task;
  });
  localStorage.setItem("todos", JSON.stringify(allTask));
}
function createTodo(taskObj, isAppend) {
  let { task, id } = taskObj;
  const taskRow = Create("div");
  taskRow.style.marginBottom = "4px";
  taskRow.style.display = "flex";
  taskRow.style.justifyContent = "space-between";
  const Todo = Create("p");
  Todo.style.margin = "0";

  Todo.setAttribute("id", id);
  Todo.addEventListener("click", handleTodoClick);
  Todo.innerText = task;
  const button = Create("button");
  button.display = "block";
  button.innerText = "Delete";
  button.addEventListener("click", handleDlt);
  taskRow.append(Todo);
  taskRow.append(button);
  if (isAppend) {
    container.append(taskRow);
  } else {
    container.prepend(taskRow);
  }
}
function handleDlt(e) {
  console.log(e.target.previousSibling.id);
  e.target.parentElement.remove();
  let allTodo = getTodo();
  let updated = allTodo.filter(
    (todo) => todo.id != e.target.previousSibling.id
  );
  console.log(updated);
  localStorage.setItem("todos", JSON.stringify(updated));
}

function TodoContainer() {
  const container = Create("div");
  container.style.width = "200px";
  container.style.height = "200px";
  container.style.backgroundColor = "lightBlue";
  container.style.marginTop = "10px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.overflow = "auto";

  return container;
}

function getInput() {
  const input = Create("input");
  input.placeholder = "Enter Todo";
  input.addEventListener("keypress", handleEvent);
  return input;
}

function getButton() {
  const button = Create("button");
  button.innerText = "Add Todo";
  button.style.marginLeft = "10px";
  button.addEventListener("click", handleAddTodo);
  return button;
}

function Create(ele) {
  return document.createElement(ele);
}

function saveToLocal(taskObj) {
  let previous = getTodo();

  previous = [taskObj, ...previous];
  localStorage.setItem("todos", JSON.stringify(previous));
}
function getTodo() {
  let todos = JSON.parse(localStorage.getItem("todos") || "[]");

  return todos;
}

// console.log(getTodo());

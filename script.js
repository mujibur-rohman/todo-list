// Get Element
const ul = document.querySelector('.todo-list');
const ulArchive = document.querySelector('.todo-list-archive');


const form = document.querySelector('.form');
const inputTodo = document.querySelector('.input-add');
const buttonAdd = document.querySelector('.add');

const addTodo = (e) => {
  e.preventDefault();

  // SAVE LOCAL STORAGE
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  if(inputTodo.value) {
    const newTodo = {
    id: Date.now(),
    task: inputTodo.value,
    isArchive: false,
  };

  todos.push(newTodo);

  

  localStorage.setItem('todos', JSON.stringify(todos));

  //li
  const li = document.createElement('li');
  li.classList.add('todo-list__item');
  li.setAttribute('key', newTodo.id);

  // input
  const input = document.createElement('input');
  input.classList.add('display-todo');
  input.value = inputTodo.value;

  //div
  const div = document.createElement('div');

  // button archive
  const buttonArchive = document.createElement('button');
  buttonArchive.classList.add('btn-archive');
  buttonArchive.innerText = 'Archive';

  // button Delete
  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('btn-delete');
  buttonDelete.innerText = 'Delete';

  // Append
  div.appendChild(buttonArchive);
  div.appendChild(buttonDelete);

  li.appendChild(input);
  li.appendChild(div);
  ul.appendChild(li);
  }

  // RESET INPUT
  inputTodo.value = '';
};

const actionTodo = (e) => {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // Delete Todo
  if (e.target.classList[0] === 'btn-delete') {
    const deleteButton = e.target;
    const li = deleteButton.parentElement.parentElement;
    const keyId = li.getAttribute('key');
    console.log(keyId);

    const inputDisplay =
      e.target.parentElement.parentElement.querySelector('.display-todo');

    const filterTodos = todos.filter((todo) => {
      return todo.id != keyId;
    });
    localStorage.setItem('todos', JSON.stringify(filterTodos));
    li.remove();
  }

  // Archive
  if(e.target.classList[0] === 'btn-archive'){
    // Get key list
    const archiveButton = e.target;
    const li = archiveButton.parentElement.parentElement;
    const keyId = li.getAttribute('key');
    // find todo same id
    const todoTarget = todos.find(todo => todo.id == keyId);
    todoTarget.isArchive = true;
    const filterTodos = todos.filter((todo) => {
      return todo.id != keyId;
    });
    filterTodos.push(todoTarget)

    localStorage.setItem('todos', JSON.stringify(filterTodos));
    li.remove();
    getTodosArchive()
    // todos.find(todo.id => )
  }
};

const actionTodoArchive = (e) => {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // Delete Todo
  if (e.target.classList[0] === 'btn-delete') {
    console.log(e.target)
    const deleteButton = e.target;
    const li = deleteButton.parentElement.parentElement;
    const keyId = li.getAttribute('key');
    console.log(keyId);

    const inputDisplay =
      e.target.parentElement.parentElement.querySelector('.display-todo');

    const filterTodos = todos.filter((todo) => {
      return todo.id != keyId;
    });
    localStorage.setItem('todos', JSON.stringify(filterTodos));
    li.remove();
  }

  // Publish
  if(e.target.classList[0] === 'btn-publish'){
    // Get key list
    const publishButton = e.target;
    const li = publishButton.parentElement.parentElement;
    const keyId = li.getAttribute('key');
    // find todo same id
    const todoTarget = todos.find(todo => todo.id == keyId);
    todoTarget.isArchive = false;
    const filterTodos = todos.filter((todo) => {
      return todo.id != keyId;
    });
    filterTodos.push(todoTarget)

    localStorage.setItem('todos', JSON.stringify(filterTodos));
    li.remove();
    getTodosArchive();
    getTodos()
    // todos.find(todo.id => )
  }
};

const getTodos = () => {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos')).filter(todo => !todo.isArchive);
  }

  while (ul.firstChild) {
    ul.removeChild(ul.lastChild);
  }

  todos.forEach((todo) => {
    //li
    const li = document.createElement('li');
    li.classList.add('todo-list__item');
    li.setAttribute('key', todo.id);

    // input
    const input = document.createElement('input');
    input.classList.add('display-todo');
    input.value = todo.task;

    //div
    const div = document.createElement('div');

    // button archive
    const buttonArchive = document.createElement('button');
    buttonArchive.classList.add('btn-archive');
    buttonArchive.innerText = 'Archive';

    // button Delete
    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('btn-delete');
    buttonDelete.innerText = 'Delete';

    // Append
    div.appendChild(buttonArchive);
    div.appendChild(buttonDelete);

    li.appendChild(input);
    li.appendChild(div);
    ul.appendChild(li);
  });
};

const getTodosArchive = () => {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos')).filter(todo => todo.isArchive);
  }
  // console.log(todos)
  while (ulArchive.firstChild) {
    ulArchive.removeChild(ulArchive.lastChild);
  }
  console.log(ulArchive.children)

  todos.forEach((todo) => {
    //li
    const li = document.createElement('li');
    li.classList.add('todo-list__item');
    li.setAttribute('key', todo.id);

    // input
    const input = document.createElement('input');
    input.classList.add('display-todo');
    input.value = todo.task;

    //div
    const div = document.createElement('div');

    // button archive
    const buttonArchive = document.createElement('button');
    buttonArchive.classList.add('btn-publish');
    buttonArchive.innerText = 'Publish';

    // button Delete
    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('btn-delete');
    buttonDelete.innerText = 'Delete';

    // Append
    div.appendChild(buttonArchive);
    div.appendChild(buttonDelete);

    li.appendChild(input);
    li.appendChild(div);
    ulArchive.appendChild(li);
  });
};



getTodos();
getTodosArchive();

const buttonList = document.querySelector('.todo-list');
const buttonListArchive = document.querySelector('.todo-list-archive');
// document.addEventListener('DOMContentLoaded', getTodos);
buttonAdd.addEventListener('click', addTodo);
buttonList.addEventListener('click', actionTodo);
buttonListArchive.addEventListener('click', actionTodoArchive);

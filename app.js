//Select DOM
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const completedButton = document.querySelector('.menu-complete');
const allButton = document.querySelector('.menu-all');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', handleTodoClick);
completedButton.addEventListener('click', completedTodo);
allButton.addEventListener('click', allTodo);
deleteSelectedButton.addEventListener('click', deleteSelectedTodos);
completeSelectedButton.addEventListener('click', completeSelectedTodos);

//Functions

function addTodo(e) {
    //Prevent natural behaviour
    e.preventDefault();
    //Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const editorContent = document
        .querySelector('[data-tiny-editor]')
        .innerHTML.trim();
    if (editorContent === '') {
        alert(
            'Please write something in the editor before adding a todo item.'
        );
        return;
    }
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo-checkbox');
    todoDiv.appendChild(checkbox);
    //Create list
    const newTodo = document.createElement('li');
    newTodo.innerHTML = editorContent;
    //Save to local
    saveLocalTodos(editorContent);

    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Clear the editor content
    document.querySelector('[data-tiny-editor]').innerHTML = '';
    //pin to start button
    const pinButton = document.createElement('button');
    pinButton.innerHTML = `<i class="fa-solid fa-hand-point-up"></i>`;
    pinButton.classList.add('pin-button');
    todoDiv.appendChild(pinButton);
    //Create Completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // Handle pin button click
    pinButton.addEventListener('click', function () {
        if (todoList.firstChild !== todoDiv) {
            todoList.insertBefore(todoDiv, todoList.firstChild);
        }
    });
    //attach final Todo
    todoList.appendChild(todoDiv);
}

function handleTodoClick(e) {
    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        // e.target.parentElement.remove();
        const todo = item.parentElement;
        todo.classList.add('fall');
        //at the end
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', (e) => {
            todo.remove();
        });
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        console.log(todo);
    }
}

function completedTodo() {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        if (todo.classList.contains('completed')) {
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    });
}
function allTodo() {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        todo.style.display = 'flex';
    });
}
function deleteSelectedTodos() {
    const checkboxes = document.querySelectorAll('.todo-checkbox');
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const todo = checkbox.parentElement;
            todo.remove();
            removeLocalTodos(todo);
        }
    });
}

function completeSelectedTodos() {
    const checkboxes = document.querySelectorAll('.todo-checkbox');
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const todo = checkbox.parentElement;
            todo.classList.toggle('completed');
        }
    });
}
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //Create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create list
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        todoInput.value = '';
        //Create Completed Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //attach final Todo
        todoList.appendChild(todoDiv);
    });
}

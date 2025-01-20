const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

loadTasks();

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        createTaskElement(task);
        taskInput.value = '';
        saveTasks();
    } else {
        alert('Please enter a task');
    }
}

addButton.addEventListener('click', addTask);

function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task;

   
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="bi bi-check-lg"></i>';
    completeButton.className = 'completeTask';

  
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="bi bi-x"></i>'; 
    deleteButton.className = 'deleteTask';

    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    
    completeButton.addEventListener('click', function () {
        listItem.style.textDecoration = 'line-through';
        listItem.style.color = '#6c757d';
    });

    
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(listItem);
        saveTasks(); 
    });
}

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function (item) {
        const taskText = item.childNodes[0].textContent.trim();
        tasks.push(taskText);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}
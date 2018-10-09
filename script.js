let tasks = (() => {
    'use strict';
  
    const arrTasks = [];
    const input = document.getElementById('js__task-input');
    const list = document.getElementById('js__tasks');
    const button = document.getElementById('js__task-add');
    const date = document.getElementById('js__task-date');
  
    const addTask = () => {
        if (input.value !== '') {
            arrTasks.push(input.value);
            createTaskElement(input.value);
        }
        input.value = '';
        date.value = '';
    }
  
    const bindEvents = () => {
      input.addEventListener('keyup', (e) => {
          e.preventDefault();
          if (e.keyCode === 13) {
            button.click();
          }
      });
      button.addEventListener('click', addTask);
      list.addEventListener('click', deleteTask);
      list.addEventListener('click', options);
    }
  
    const createTaskElement = (value) => {
        const element = document.createElement('li');
        const remove = document.createElement('button');
        const taskDate = document.createElement('div');
        const rm = document.createTextNode('remove');
  
        taskDate.innerText = date.value
        element.innerText = value;
        element.setAttribute('class', 'todo-element');
        element.setAttribute('id', __uniqueId());
        remove.setAttribute('id', 'js__task-remove');
        remove.appendChild(rm);
        element.appendChild(remove);
        element.appendChild(taskDate);
        list.appendChild(element);
    }
  
    const __taskIndex = () => {
        const li = document.getElementsByClassName('js__to-remove')[0];
        var nodes = Array.prototype.slice.call( list.children );
        var index = nodes.indexOf(li);
        return index;
    }

    const deleteTask = (index) => {
        const $todos = document.querySelectorAll('#js__tasks li');
        [...$todos].find(($todo, key) => key === __taskIndex()).remove();
        arrTasks.splice(__taskIndex(), 1);     
    }

    const __uniqueId = () => {
        return Math.random().toString(36).substr(2, 5);
    }

    const options = (e) => {
        if (e.target.tagName === 'LI') {
            const liElement = e.target.closest('LI');
            liElement.classList.add('js__to-remove');
            console.log(e.target.id);
        }
    }

    return {
        bindEvents: bindEvents,
        addTask: addTask,
        createTaskElement: createTaskElement,
        deleteTask: deleteTask
    }
  })();
tasks.bindEvents();

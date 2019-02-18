let tasks = (() => {
    'use strict';
  
    const arrTasks      = [];
    const input         = document.getElementById('js__task-input');
    const list          = document.getElementById('js__tasks');
    const button        = document.getElementById('js__task-add');
    const date          = document.getElementById('js__task-date');
    const modalDate     = document.getElementById('js__modal-date');
    const btnRemove     = document.getElementById('js__task-remove');
    const divAddTask    = document.getElementById('js__task-add_div');
    const divEditTask   = document.getElementById('js__task-edit_div');
    const editInput     = document.getElementById('js__mytask');
    const btnEdittask   = document.querySelector('.js__task-edit');
    const btnAddTask    = document.querySelector('.js__task-add');
    const btnSaveTask   = document.querySelector('.js__task-save');
    const btnCheckTask  = document.querySelector('.js__task-check');
    const backdrop      = document.querySelector('.backdrop');
  
    const addTask = () => {
        if (input.value !== '') {
            arrTasks.push(input.value);
            createTaskElement(input.value);
        }
        input.value = '';
        date.value = '';
    }
  
    const __uniqueId = () => {
        return Math.random().toString(36).substr(2, 5);
    }

    const createTaskElement = (value) => {
        const element = document.createElement('li');
        const taskDate = document.createElement('div');
        const p = document.createElement('p');
        taskDate.innerText = date.innerText;
        if (taskDate.innerText === '') {
            taskDate.innerText = 'no deadline';
        }
        p.innerText = value;
        element.setAttribute('class', 'todo-element');
        element.setAttribute('id', __uniqueId());
        p.setAttribute('id', __uniqueId());
        taskDate.setAttribute('class', 'task-date');
        element.appendChild(p);
        element.appendChild(taskDate);
        list.appendChild(element);
    }

    const __taskIndex = () => {
        const li = document.getElementsByClassName('js__to-edit')[0];
        var nodes = Array.prototype.slice.call( list.children );
        var index = nodes.indexOf(li);

        return index;
    }

    const deleteTask = (index) => {
        if(btnRemove) {
            const todos = document.querySelectorAll('#js__tasks li');
            if (todos.length > 0) {
                [...todos].find((todo, key) => key === __taskIndex()).remove();
                arrTasks.splice(__taskIndex(), 1);    
            }
            __activeClassButton(); 
        }
    }

    const _addClassToFindTask = (e) => {
        if (e.target.tagName === 'P') {
            const c = document.querySelector('#js__tasks li.js__to-edit');
            const item = e.target.closest('LI');
            if (c !== null) {
                c.classList.remove('js__to-edit');
            }
            item.classList.add('js__to-edit');
            __activeClassButton(e);

            return e.target.id;
        }
}

    const bindEvents = () => {
        btnAddTask.addEventListener('click', () => {
            divAddTask.className = 'visible';
            getFocus(divAddTask, input);
        });
        input.addEventListener('keyup', (e) => {
          e.preventDefault();
          if (e.keyCode === 13) {
            button.click();
          }
        });
        document.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.keyCode === 27) {
                backdrop.classList.add('hidden');
                divEditTask.classList.add('hidden');                
            }
        });
        btnEdittask.addEventListener('click', __editTask);
        btnSaveTask.addEventListener('click', saveTask);
        list.addEventListener('click', _addClassToFindTask);
        button.addEventListener('click', addTask);
        btnRemove.addEventListener('click', deleteTask);
        btnSaveTask.addEventListener('click', saveTask);
        btnCheckTask.addEventListener('click', checkTask);
    }


    const __editTask = () => {
        const p = document.querySelector('li.js__to-edit p');
        const elementId = p.getAttribute('id');
        const val = document.getElementById(elementId).innerText;
        const date = document.querySelector('.task-date').innerText;
        divEditTask.classList.remove('hidden');
        divEditTask.classList.add('modal');
        backdrop.classList.remove('hidden');

        editInput.value = val;
        modalDate.textContent = date;

        getFocus(divEditTask, editInput);  
    }

    const saveTask = () => {
        const newValue = editInput.value;
        const p = document.querySelector('li.js__to-edit p');

        p.innerHTML = newValue;
        arrTasks[__taskIndex()] = newValue;
        divEditTask.classList.remove('modal');
        divEditTask.classList.add('hidden');
        closeModal();
    }

    const getFocus = (a, b) => {
        if (a.classList.contains('visible')) {
            b.focus();
        }
    }
    
    const closeModal = () => {
        if (backdrop) {
            backdrop.classList.add('hidden');
            divEditTask.classList.add('hidden');
        }
    }

    const __activeClassButton = () => {
        const selector = document.querySelector('#js__tasks li.js__to-edit');
        const btn = document.querySelectorAll('.btn');
        [].forEach.call(btn, (el) => {
            if (selector !== null) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }

    const checkTask = () => {
        const elem = document.querySelector('#js__tasks li.js__to-edit');
        if (elem) {
            elem.classList.add('task_done');
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
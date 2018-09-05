let tasks = (function(){
  'use strict';

  const tasksList = [];
  const input = document.getElementById('task-input');
  const list = document.getElementById('tasks');

  const addTask = function(ev) {    
    if (input.value != '') {
      tasksList.push(input.value);
    }
    taskList(input.value);
    input.value = '';
  }

  const bindEvents = function() {
    document.getElementById('task-input__button').addEventListener('click', addTask);
    list.addEventListener('click', deleteTask);
  }

  const taskList = function(value) {
    const element = document.createElement('li');
    const remove = document.createElement('button');
    const rm = document.createTextNode('remove');

    element.innerText = value;
    element.setAttribute('class', 'todo-element');
    remove.setAttribute('id', 'task-remove__button');
    remove.appendChild(rm);
    element.appendChild(remove);
    list.appendChild(element);
  }

  const deleteTask = function(e) {
    if (e.target.closest('#task-remove__button') !== null) {
      const todoElem = e.target.closest('.todo-element');
      todoElem.parentNode.removeChild(todoElem);
      tasksList.splice(todoElem, 1);
    }
  }

  const init = function() {
    bindEvents();
  }
  return {
      init: init,
      addTask: addTask,
      taskList: taskList,
      deleteTask: deleteTask
  }
})();
tasks.init();

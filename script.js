let tasks = (function(){
    'use strict';
  
    const tasksList = ['test'];

    const addTask = function() {
      const input = document.getElementById('task-input');
      if (input != null) {
        tasksList.push(input.value);
      }
      taskList();
      input.value = '';
    }

    const bindEvents = function() {
      document.getElementById('task-input__button').addEventListener('click', addTask);
    }

    const taskList = function() {
      const list = document.querySelector('#tasks');
      list.innerHTML = '';

      tasksList.forEach(function(el) {
          const element = document.createElement('li');
          element.innerHTML = el;
          list.appendChild(element);
      });
  }
    const init = function() {
      bindEvents();
      taskList();
  }
    return {
        init: init,
        addTask: addTask,
        taskList: taskList
    }
  })();
  tasks.init();
 

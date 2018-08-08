let tasks = (function(){
    'use strict';
 
    const tasksList = [];
    const input = document.getElementsByClassName('task-input');
    const button = document.getElementsByClassName('task-input__button');
 
    return {
        getTasks () {
          return tasksList
        },
        addTask (name) {
          tasksList.push(name);
  
          return this;
        }
    }
  })();
 
  tasks.addTask('dupa')
  console.log(tasks.addTask('test').getTasks())
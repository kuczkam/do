(function() {
    'use strict';
    let tasks = {
        tasks: [],
        addNewTask: function() {
            this.addTask.push(this.tasks);
            console.log(this.tasks);
        }
    }
    tasks.tasks();
})();

import { createProjectItemDiv } from "./createProjectContent";

class Project {
    constructor(name) {
        this.name = name;
        this.taskList = [];
        this.projectDiv = createProjectItemDiv(this.name);
        this.projectTaskDiv = document.createElement('div');
    }

    getName() {
        return this.name;
    }

    getProjectTaskDiv() {
        return this.projectTaskDiv;
    }

    getProjectDiv() {
        return this.projectDiv;
    }

    //get task list
    getTaskList() {
        return this.taskList;
    }

    addTask(task) {
        this.taskList.push(task);
    }

    removeTask(index) {
        this.taskList.splice(index, 1);

    }
}

export { Project };

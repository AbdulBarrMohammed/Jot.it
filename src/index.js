import "./style.css";
import { Project } from "./Project";
import { Task } from './Task';
import { createProjectHeader } from "./createProjectContent";
import { addTaskButtonDiv } from "./createProjectContent";

const projectList = {};
const todayList = {};
const importantList = {};
const next7daysList = {};
const allTasksList = {};

let currentTaskDivId = '';

//buttons
const addProjectBtn = document.querySelector('.addProjectBtn');
const taskBtn = document.querySelector('.tasksBtn');
const todayBtn = document.querySelector('.todayBtn');
const next7DaysBtn = document.querySelector('.nextDaysBtn');
const importantBtn = document.querySelector('.importantBtn');

const editOrDeleteDialog = document.querySelector('#editOrDeleteDialog');

const editOrDeleteTaskDialog = document.getElementById("editOrDeleteTaskDialog");
const editTaskBtn = editOrDeleteTaskDialog.querySelector(".edit-task-btn");
const deleteTaskBtn = editOrDeleteTaskDialog.querySelector('.delete-task-btn');


taskBtn.addEventListener('click', function(e) {
    content.innerHTML = '';
    for (const task in allTasksList) {
        const taskItems = allTasksList[task];
        for (let i = 0; i < taskItems.length; i++) {
            content.appendChild(taskItems[i]);
        }
    }
})

todayBtn.addEventListener('click', function(e) {
    content.innerHTML = 'Today';
})

next7DaysBtn.addEventListener('click', function(e) {
    content.innerHTML = 'Next 7 Days';
})

importantBtn.addEventListener('click', function(e) {
    content.innerHTML = 'Important';
})

const projectDialog = document.getElementById("projectDialog");
const addTaskDialog = document.getElementById("addTaskDialog");
const confirmBtn = projectDialog.querySelector(".submit-button");

const confirmBtnTask = addTaskDialog.querySelector(".submit-button-task");

const content = document.querySelector('#content');


const projectItems = document.querySelector('.projectItem');

let projectItemCurrentId = '';

projectItems.addEventListener('click', function(e) {
        const addTaskBtn = addTaskButtonDiv();
        projectItemCurrentId = e.target.id;

        if (projectItemCurrentId === '') {
            console.log("ERRROR ");
        }
        else if (projectItemCurrentId === 'deleteOrEdit') {
            projectItemCurrentId = e.target.parentElement.id;
            editOrDeleteDialog.showModal();
        }
        else {
            content.innerHTML = '';
            content.appendChild(createProjectHeader(projectList[projectItemCurrentId].getName()));
            const taskList = projectList[projectItemCurrentId].getTaskList();
            for (let i = 0; i < taskList.length; i++) {
                content.appendChild(taskList[i].createTaskDiv());
            }
            content.appendChild(addTaskBtn);
        }
})

content.addEventListener('click', function(e) {
    if (e.target.id == 'add-task') {
        addTaskDialog.showModal();
    }
    else if (e.target.id == 'circle') {
        const parent = e.target.parentElement;
        const crossOutBtn = parent.children[0];
        crossOutBtn.style.backgroundColor = '#3981F7';
        crossOutBtn.style.border = 'none';
        const taskList = projectList[projectItemCurrentId].getTaskList();
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].getId() === parent.parentElement.id) {
                taskList[i].setIsCrossedOut(true);
            }
        }
    }
    else if (e.target.id == 'deleteOrEditTask') {
        const parent = e.target.parentElement;
        currentTaskDivId = parent.parentElement.id;
        editOrDeleteTaskDialog.show();
    }
    else if (e.target.id == 'starBtn') {
        console.log('important btn pressed');
    }
})


addProjectBtn.addEventListener('click', () => {
    projectDialog.showModal();
})

confirmBtn.addEventListener("click", (e) => {
    event.preventDefault(); // We don't want to submit this fake form
    const form = projectDialog.querySelector('form');
    if (!form.checkValidity()) {
      // Form is not valid, so we let the browser show the validation message
      alert("fill in required fields");
      return;
    }
    const newTitle = document.querySelector('#title').value;
    const newProject = new Project(newTitle);
    const projectDiv = newProject.getProjectDiv();

    projectItems.appendChild(projectDiv);
    projectList[projectDiv.id] = newProject;

    projectDialog.close();
  });

confirmBtnTask.addEventListener('click', (e) => {
    event.preventDefault();
    const form = addTaskDialog.querySelector('form');
    if (!form.checkValidity()) {
        // Form is not valid, so we let the browser show the validation message
        alert("fill in required fields");
        return;
      }

      //get form information for tasks
      const newTitle = document.querySelector('#taskTitle').value;
      const newDetails = document.querySelector('#details').value;
      const newDate = document.querySelector('#date').value;

      //create new task object
      const newTask = new Task(newTitle, newDetails, newDate);

      //generate unique id for task and create task div
      const randomNum = Math.floor(Math.random() * 9000);
      const randomNumTwo  = Math.floor(Math.random() * 9000);
      newTask.setId(`${randomNum}-${randomNumTwo}`);
      const taskDiv = newTask.createTaskDiv();

      projectList[projectItemCurrentId].addTask(newTask);

      const addBtn = document.getElementById("add-task");
      content.removeChild(addBtn);
      content.appendChild(taskDiv);

      if (!allTasksList[projectItemCurrentId] || !Array.isArray(allTasksList[projectItemCurrentId])) {
        allTasksList[projectItemCurrentId] = [];
      }
      if (allTasksList[projectItemCurrentId].length == 0) {
        allTasksList[projectItemCurrentId] = [taskDiv];
      }
      else {
        allTasksList[projectItemCurrentId].push(taskDiv);
      }
      const addTaskBtn = addTaskButtonDiv();

      content.appendChild(addTaskBtn);

      addTaskDialog.close();
  })

//edit or delete modal dialog button
const deleteProjectBtn = document.querySelector('.delete-project-btn');
deleteProjectBtn.addEventListener('click', function(e) {
    //console.log(projectItemCurrentId);
    event.preventDefault();

    //remove deleted project from screen
    const child = document.getElementById(projectItemCurrentId);
    projectItems.removeChild(child);

    //reset content html
    content.innerHTML = '';

    //remove deleted project from project object key, value list;
    delete projectList[projectItemCurrentId];
    delete allTasksList[projectItemCurrentId];
    editOrDeleteDialog.close();
})

deleteTaskBtn.addEventListener('click', function(e) {
    event.preventDefault();

    const deletedTaskDiv = document.getElementById(currentTaskDivId);
    content.removeChild(deletedTaskDiv);

    const taskList = projectList[projectItemCurrentId].getTaskList();
    for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].getId() === currentTaskDivId) {
                projectList[projectItemCurrentId].removeTask(i);
                break;
        }
    }
})

const editTaskDialog = document.getElementById("editTaskDialog");
const confirmBtnEdit = editTaskDialog.querySelector(".submit-button-edit");

editTaskBtn.addEventListener('click', function(e) {
    event.preventDefault();

    editOrDeleteTaskDialog.close();
    editTaskDialog.showModal();



    /*

    const editedTaskDiv = document.getElementById(currentTaskDivId);
    console.log(editedTaskDiv);
    const title = editedTaskDiv.querySelector('#titleTag');
    title.textContent = 'new text has changed';
    console.log(title); */

})

confirmBtnEdit.addEventListener('click', function(e) {
    event.preventDefault();

      const newTitle = document.querySelector('#editTaskTitle').value;
      const newDetails = document.querySelector('#editDetails').value;
      const newDate = document.querySelector('#editDate').value;

      const editedTaskDiv = document.getElementById(currentTaskDivId);
      const title = editedTaskDiv.querySelector('#titleTag');
      const detail = editedTaskDiv.querySelector('#detailsTag');
      const date = editedTaskDiv.querySelector('#dateTag');
      title.textContent = newTitle;
      detail.textContent = newDetails;
      date.textContent = newDate;

})

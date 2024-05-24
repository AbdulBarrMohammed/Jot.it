import "./style.css";
import { Project } from "./Project";
import { Task } from './Task';
import { createProjectHeader } from "./createProjectContent";
import { addTaskButtonDiv } from "./createProjectContent";

const projectList = {};
const next7daysList = {};

let currentTaskDivId = '';

//buttons
const addProjectBtn = document.querySelector('.addProjectBtn');
const taskTabBtn = document.querySelector('.tasksBtn');
const todayBtn = document.querySelector('.todayBtn');
const next7DaysBtn = document.querySelector('.nextDaysBtn');
const importantBtn = document.querySelector('.importantBtn');

//Edit or delete project diaglog
const editOrDeleteDialog = document.querySelector('#editOrDeleteDialog');

//Edit or delete Task dialog
const editOrDeleteTaskDialog = document.getElementById("editOrDeleteTaskDialog");
const editTaskBtn = editOrDeleteTaskDialog.querySelector(".edit-task-btn");
const deleteTaskBtn = editOrDeleteTaskDialog.querySelector('.delete-task-btn');

// function to display all the tasks added when the task tab btn is pressed;
taskTabBtn.addEventListener('click', function(e) {

    content.innerHTML = '';
    for (const task in projectList) {
        const taskLst = projectList[task].getTaskList();
        for (let i = 0; i < taskLst.length; i++) {
            content.appendChild(taskLst[i].createTaskDiv());
            console.log(taskLst[i].createTaskDiv());
        }

    }
})

todayBtn.addEventListener('click', function(e) {
    content.innerHTML = '';
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    month = month.toString();

    if (month.length === 1) {
        month = `0${month}`;
    }

    let fullDate = `${year}-${month}-${day}`;
    console.log(fullDate);

    content.innerHTML = '';
    for (const task in projectList) {
        const taskLst = projectList[task].getTaskList();
        for (let i = 0; i < taskLst.length; i++) {
            if(taskLst[i].getDate() === fullDate) {
                content.appendChild(taskLst[i].createTaskDiv());
            }

        }

    }
})

next7DaysBtn.addEventListener('click', function(e) {
    content.innerHTML = 'Next 7 Days';
})

importantBtn.addEventListener('click', function(e) {
    content.innerHTML = '';
    for (const task in projectList) {
        const taskLst = projectList[task].getTaskList();
        for (let i = 0; i < taskLst.length; i++) {
            if(taskLst[i].getIsImportant()) {
                content.appendChild(taskLst[i].createTaskDiv());
            }

        }

    }
})

const projectDialog = document.getElementById("projectDialog");
const cancelBtn = projectDialog.querySelector(".cancel-button");
const addTaskDialog = document.getElementById("addTaskDialog");
const confirmBtn = projectDialog.querySelector(".submit-button");

const confirmBtnTask = addTaskDialog.querySelector(".submit-button-task");

const content = document.querySelector('#content');


const projectItems = document.querySelector('.projectItem');

//variable to keep track of current project item id when pressed;
let projectItemCurrentId = '';

cancelBtn.addEventListener('click', function(e) {
    projectDialog.close();
})
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

        // Change the fill color of the path to yello
        const svgPath = e.target.querySelector('path');
        if (svgPath) {
            svgPath.style.fill = 'yellow';
        }
        const parent = e.target.parentElement;
        const taskList = projectList[projectItemCurrentId].getTaskList();
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].getId() === parent.parentElement.id) {
                taskList[i].setIsImportant(true);
            }
        }

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
    //delete allTasksList[projectItemCurrentId];
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
    editOrDeleteTaskDialog.close();
})

const editTaskDialog = document.getElementById("editTaskDialog");
const confirmBtnEdit = editTaskDialog.querySelector(".submit-button-edit");

editTaskBtn.addEventListener('click', function(e) {
    event.preventDefault();

    editOrDeleteTaskDialog.close();
    editTaskDialog.showModal();

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

      const taskList = projectList[projectItemCurrentId].getTaskList();
      for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].getId() === currentTaskDivId) {
                taskList[i].setTitle(newTitle);
                taskList[i].setDetails(newDetails);
                taskList[i].setDate(newDate);
                break;
            }
        }
    editTaskDialog.close();

})

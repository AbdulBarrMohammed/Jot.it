import pound from './pound.svg';
import verticalDots from './dots-vertical.svg';
import star from './img/star-outline.svg';
import { Task } from './Task';
import plus from './img/plus-circle.svg';


function createProjectItemDiv(name) {
    const randomNum = Math.floor(Math.random() * 9000);
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.id = `${name}-${randomNum}`;

    const leftContent = document.createElement('div');
    leftContent.style.display = 'flex';
    leftContent.id =  `${name}-${randomNum}`;

    const deleteOrEdit = document.createElement('img');
    deleteOrEdit.src = verticalDots;
    deleteOrEdit.style.height = '20px';
    deleteOrEdit.id = 'deleteOrEdit';

    const img = document.createElement('img');
    img.src = pound;
    img.style.height = '20px';

    const pTag = document.createElement('p');
    pTag.textContent = name;
    pTag.style.marginTop = '2px';
    pTag.style.paddingLeft = '5px';
    pTag.id =  `${name}-${randomNum}`;

    leftContent.appendChild(img);
    leftContent.appendChild(pTag);

    div.appendChild(leftContent);
    div.appendChild(deleteOrEdit);

    //div.appendChild(img);
    //div.appendChild(pTag);

    return div;

}


function createTaskCard(title, details, date, isCrossedOut, id) {
    const div = document.createElement('div');
    div.id = id;

    div.style.padding = '20px';
    div.style.borderBottom = '1px solid #e5e5e5';
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.alignItems = 'center';

    const leftContainer = document.createElement('div');
    leftContainer.style.display = 'flex';
    leftContainer.style.flexDirection = 'column';

    const titleTag = document.createElement('p');
    titleTag.textContent = title;
    titleTag.id = 'titleTag';

    const detailsTag = document.createElement('p');
    detailsTag.textContent = details;
    detailsTag.style.color = 'gray';
    detailsTag.id = 'detailsTag';

    leftContainer.appendChild(titleTag);
    leftContainer.appendChild(detailsTag);

    const circle = document.createElement('div');
    circle.style.height = '20px';

    if (isCrossedOut) {
        circle.style.backgroundColor = '#3981F7';
        circle.style.border = 'none';
    }
    else {
        circle.style.backgroundColor = 'white';
    }
    circle.style.width = '20px';
    circle.style.border = '1px solid black';
    circle.style.borderRadius = '20px';
    circle.id = 'circle';

    const leftSide = document.createElement('div');
    leftSide.style.display = 'flex';
    leftSide.style.gap = '10px';

    leftSide.appendChild(circle);
    leftSide.appendChild(leftContainer);

    //leftContainer.appendChild(circle);

    const rightContainer = document.createElement('div');
    rightContainer.style.display = 'flex';
    rightContainer.style.gap = '10px';
    rightContainer.id = 'rightContainer';

    const dateTag = document.createElement('p');
    dateTag.textContent = date;
    dateTag.style.paddingTop = '2px';
    dateTag.style.fontSize = '14px';
    dateTag.style.color = '#3981F7';
    dateTag.id = 'dateTag';

    const starImg = document.createElement('img');
    starImg.src = star;
    starImg.style.height = '20px';
    starImg.id = 'starBtn';

    const deleteOrEdit = document.createElement('img');
    deleteOrEdit.src = verticalDots;
    deleteOrEdit.style.height = '20px';
    deleteOrEdit.id = 'deleteOrEditTask';

    rightContainer.appendChild(dateTag);
    rightContainer.appendChild(starImg);
    rightContainer.appendChild(deleteOrEdit);



    div.appendChild(leftSide);
    div.appendChild(rightContainer);

    return div;


}

function createProjectHeader(title) {
    const div = document.createElement('div');
    div.style.padding = '20px';
    div.style.borderBottom = '1px solid #e5e5e5';

    const titleTag = document.createElement('p');
    titleTag.style.fontSize = '36px';
    titleTag.style.fontWeight = 'bold';
    titleTag.style.paddingBottom = '20px';
    titleTag.textContent = title;

    const taskTag = document.createElement('p');
    taskTag.textContent = 'My Tasks';
    taskTag.style.fontWeight = 'bold';
    div.appendChild(titleTag);
    div.appendChild(taskTag);

    return div;
}

function addTaskButtonDiv() {
    const div = document.createElement('div');
    div.id = 'add-task';
    div.style.display = 'flex';
    div.style.gap = '5px';
    div.style.paddingLeft = '30px';
    div.style.paddingTop = '20px';
    const addBtn = document.createElement('img');
    addBtn.src = plus;
    addBtn.id = 'add-task';

    const pTag = document.createElement('p');
    pTag.innerText = 'Add Task';
    pTag.style.paddingTop = '5px';
    pTag.id = 'add-task';

    div.appendChild(addBtn);
    div.appendChild(pTag);

    return div;

}

export { createProjectItemDiv, createTaskCard, createProjectHeader, addTaskButtonDiv };

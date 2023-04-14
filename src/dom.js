import { createNewTask, deleteTask, finishTaskData } from "./task.js";
import { createNewProject } from "./project.js";


function makeUpperCase(input) {
    return input.slice(0,1).toUpperCase() + input.slice(1);
}

//-----Functions for creating & displaying new projects -----//
function getProjectValue(e) {
    // Create new project and display with input value
    if (e.key === 'Enter') {
        createNewProject(this.value);
        displayProjectInput(this.value);
        this.value = '';
    }
}


function displayProjectInput(value) {
    const projectList = document.querySelector('.project--list');

    // Take input value and render it on screen
    let html = `<li class="project--item">${makeUpperCase(value)}</li>`
    projectList.insertAdjacentHTML('beforeend', html)  
}


function getTaskValue(e) {
    if (e.key === 'Enter') {
        createNewTask(this.value)
        this.value =''
    }
}


function displayTaskInput(task) {
    const taskList = document.querySelector('.task--list')

    let html = `
    <li class="task--item" id="${task.id}">
    <input type="checkbox" class="checkbox" ${task.finished ? 'checked' : '!checked' }>
    <span class="checkmark"></span>
    <h3 class="task--title ${task.finished ? 'task--checked':''}">${makeUpperCase(task.title)}</h3>
    <div class="icons">
    <i class="material-symbols-outlined btn-delete">delete</i>
    </div>
    </li>
    `
    taskList.insertAdjacentHTML('beforeend', html)
    renderBtn()
}


function renderBtn() {   
    const deleteBtns = document.querySelectorAll('.btn-delete')
    const taskItems = document.querySelectorAll('.task--item')
    deleteBtns.forEach(btn=>btn.addEventListener('click',deleteTask))
    taskItems.forEach(btn=>btn.addEventListener('click', checkOffTask))
}

function checkOffTask(e) {
    if (e.target.matches('.task--title') || e.target.matches('.checkmark')) {
        const checkbox = this.firstElementChild
        const tasktitle = this.lastElementChild.previousElementSibling
        tasktitle.classList.toggle('task--checked')
        checkbox.checked = checkbox.checked ? false : true; 
        
        finishTaskData(e)
    }
}

export { getProjectValue, displayProjectInput, getTaskValue, displayTaskInput, renderBtn, checkOffTask };

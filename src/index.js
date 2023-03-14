const gridContainer = document.querySelector('.grid-container')
const projectInput = document.querySelector('.project--input')
const projectList = document.querySelector('.project--list')
const projectItem = document.querySelector('.project--item')
const taskOverview = document.querySelector('.overview')
const taskInput = document.querySelector('.task--input')
const taskList = document.querySelector('.task--list')
const taskItem = document.querySelector('.task--item')
const checkbox = document.querySelector('.checkbox')
const icons = document.querySelector('.material-symbols-outlined')

const projects = []

class Project{
    constructor(name, task, id= `P${(Date.now() + '').slice(-6)}`){
        this.name = name;
        this.task = {task}
        this.id = id;
    }

    // pushProject(obj) {
    //     projects.push(obj)
    // }
}

class Task extends Project{
    constructor(title, id = `T${(Date.now() + '').slice(-6)}`) {
        this.title = title;
        this.id = id;
    }
}

(function app() {
    createNewProject('General')


    projectInput.addEventListener('keydown', getProjectValue)
    // projectInput.addEventListener('keydown', getValue)
    taskInput.addEventListener('keydown', getTaskValue)
    
})()

function createNewProject(pjtname) {
    projects.push(new Project(pjtname))
}

// Get value from input value
function getProjectValue(e) {
    if (e.key === 'Enter') {
        displayProjectInput(this.value)
        createNewProject(this.value)
        this.value =''
    }
}

// Take input value and render it on screen
function displayProjectInput(value) {
    let html = `<li class="project--item">${value.slice(0,1).toUpperCase()+value.slice(1)}</li>`
    projectList.insertAdjacentHTML('beforeend',html)
}

function getTaskValue(e) {
    if (e.key === 'Enter') {
        displayTaskInput(this.value)
        this.value =''
    }
}

function displayTaskInput(value) {
    let html = `
    <li class="task--item">
    <i class="material-symbols-outlined">drag_indicator</i>
    <input type="checkbox" class="checkbox">
    ${value.slice(0, 1).toUpperCase() + value.slice(1)}
    <div class="icons">
        <i class="material-symbols-outlined">edit</i>
        <i class="material-symbols-outlined">delete</i>
    </div>
    </li>
    `
    taskList.insertAdjacentHTML('beforeend',html)
}


//TODO implement function to connect task with a project
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
        this.task = [task];
        this.id = id;
    }

}

class Task{
    constructor(title, id = `T${(Date.now() + '').slice(-6)}`) {
        this.title = title;
        this.id = id;
    }
}

(function app() {
    createNewProject('General')
    displayProjectInput('General')
    
    createNewProject('Holiday')
    displayProjectInput('Holiday')

    const projectItems = document.querySelectorAll('.project--item')
    projectItems.forEach(item=> item.addEventListener('click', () => {
        console.log('clicked!')
        item.classList.toggle('clicked')
    }))

    projectInput.addEventListener('keydown', getProjectValue)
    taskInput.addEventListener('keydown', getTaskValue)
  
})()

function createNewProject(pjtname) {
    // create new project object and push it to array
    projects.push(new Project(pjtname))
}

function getProjectValue(e) {
    // Create new project and display with input value
    if (e.key === 'Enter') {
        displayProjectInput(this.value)
        createNewProject(this.value)
        this.value =''
    }
}

function displayProjectInput(value) {
    // Take input value and render it on screen
    let html = `<li class="project--item">${value.slice(0,1).toUpperCase()+value.slice(1)}</li>`
    projectList.insertAdjacentHTML('beforeend', html)

}

function getTaskValue(e) {
    if (e.key === 'Enter') {
        displayTaskInput(this.value)
        createNewTask(this.value)
        this.value =''
    }
}

function createNewTask(pjtname,taskname) {
    const selectedProject = projects.find(pjt=>pjt.name===pjtname).task
    selectedProject.push(new Task(taskname))
}
// console.log(projects.find(pjt=>pjt.name==='General').task=new Task('eat more'))

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




//TODO find a way to select one project and attach task input to it
const gridContainer = document.querySelector('.grid-container')
const projectInput = document.querySelector('.project--input')
const projectList = document.querySelector('.project--list');
const projectItem = document.querySelector('.project--item')
const taskOverview = document.querySelector('.overview--list')
const taskInput = document.querySelector('.task--input')
const taskList = document.querySelector('.task--list')
const taskItem = document.querySelector('.task--item')
const checkbox = document.querySelector('.checkbox')
const icons = document.querySelector('.material-symbols-outlined')
const projects = []



class Project{
    constructor(name, task, active = false, id = `P${(Date.now() + '').slice(-6)}`){
        this.name = name;
        this.task = [];
        this.active = active
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
    projectList.firstElementChild.classList.add('active')
    projects.find(project => project.name === 'General').active = true;

    // createNewProject('Holiday')
    // displayProjectInput('Holiday')
   

/* This code below adds a single click event listener to the project list element 
and uses event delegation to determine which project item was clicked. 
It then removes the active class from any previously active item and adds it to the clicked item.
By using event delegation, you reduce the number of event listeners attached to the document and improve performance. */

    projectList.addEventListener('click', (event) => {
        if (event.target.matches('.project--item')) {
            const activeItem = projectList.querySelector('.project--item.active');
            if (activeItem) {
                activeItem.classList.remove('active');
                inactivate()
            }           
            activate()
            renderTasks()
            
        }
    });

    projectInput.addEventListener('keydown', getProjectValue)
    taskInput.addEventListener('keydown', getTaskValue)
  

})()


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

function inactivate() {
    taskList.textContent=''
    projects.forEach(project => project.active = false);
}

function activate() {
    event.target.classList.add('active');
    projects.find(project => project.name === event.target.textContent).active = true;
}

function createNewProject(projectName) {
    // create new project object and push it to array
    projects.push(new Project(makeUpperCase(projectName)))
    
}

function displayProjectInput(value) {
    // Take input value and render it on screen
    let html = `<li class="project--item">${makeUpperCase(value)}</li>`
    projectList.insertAdjacentHTML('beforeend', html)  
}


//-----Functions for creating & displaying new tasks -----//
function findProject() {
    // querySelectorAll should stay in this function to select all elements including the ones generated by user input
    const projectItemAll = document.querySelectorAll('.project--item')

    // Find a project that contains 'active' class (=clicked by user)
    const activeProject = [...projectItemAll]
        .find(project => project.classList.contains('active'))

    // Find a exact data in 'proejcts' array that matches clicked project
    const activeProjectData = projects
        .find(project => project.name === activeProject.textContent).task
    
    // Return an object that contains both the project element and project data
    return {
        element: activeProject,
        data: activeProjectData
    };
}

function getTaskValue(e) {
    if (e.key === 'Enter') {
        createNewTask(this.value)
        this.value =''
    }
}


function createNewTask(taskInput) {
    // Create new task with user input
    let task = new Task(`${makeUpperCase(taskInput)}`)  
    // Push(add) created task in the array
    findProject().data.push(task)
    // Display task title in DOM 
    displayTaskInput(task);
}

function renderTasks() {
    findProject().data.forEach(task => {
        displayTaskInput(task)               
    })
}

function displayTaskInput(task) {
    let html = `
    <li class="task--item" id="${task.id}">
    <i class="material-symbols-outlined">drag_indicator</i>
    <input type="checkbox" class="checkbox">
    <h3 class="task--title">${makeUpperCase(task.title)}</h3>
    <div class="icons">
        <i class="material-symbols-outlined btn-edit">edit</i>
        <i class="material-symbols-outlined btn-delete">delete</i>
        </div>
        </li>
        `
    taskList.insertAdjacentHTML('beforeend', html)
    renderBtn()


}


function renderBtn() {   
    const deleteBtns = document.querySelectorAll('.btn-delete')
    const editBtns = document.querySelectorAll('.btn-edit') 
    const taskTitles = document.querySelectorAll('.task--title')

    deleteBtns.forEach(btn=>btn.addEventListener('click',deleteBtnEvent))
    editBtns.forEach(btn => btn.addEventListener('click', editBtnEvent))
    taskTitles.forEach(btn=>btn.addEventListener('click', checkOffTask))

}

function checkOffTask() {
    const checkbox = this.previousElementSibling
    this.classList.toggle('task--checked')
    checkbox.classList.toggle('task--checked')
    checkbox.checked = checkbox.checked ? false : true;  
}


//TODO add logic to event listener for editiing function
function editBtnEvent() {
    console.log('clicked!')
}

function deleteBtnEvent() {
    // Remove from DOM
    let taskDiv = this.parentNode.parentNode
    taskDiv.parentElement.removeChild(taskDiv)

    // Remove from backend data
    let dataRemove = findProject().data.find(task => task.id === taskDiv.id);
    findProject().data.pop(dataRemove)
}



//TODO handle error when nothing is typed in input
//TODO refer to Forkify architecture (MVC architecture)


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
    constructor(name, task, id= `P${(Date.now() + '').slice(-6)}`){
        this.name = name;
        this.task = [];
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
    createNewProject('Holiday')
    displayProjectInput('Holiday')
   

/* This code below adds a single click event listener to the project list element and uses event delegation to determine which project item was clicked. It then removes the active class from any previously active item and adds it to the clicked item.
By using event delegation, you reduce the number of event listeners attached to the document and improve performance. */

    projectList.addEventListener('click', (event) => {
      if (event.target.matches('.project--item')) {
        const activeItem = projectList.querySelector('.project--item.active');
        if (activeItem) {
          activeItem.classList.remove('active');
          taskList.textContent=''
        }
        event.target.classList.add('active');
        renderTasks()
        }
    });

    projectInput.addEventListener('keydown', getProjectValue)
    taskInput.addEventListener('keydown', getTaskValue)
  
})()

function getProjectValue(e) {
    // Create new project and display with input value
    if (e.key === 'Enter') {
        createNewProject(this.value)
        displayProjectInput(this.value)
        this.value =''
    }
}
function createNewProject(pjtname) {
    // create new project object and push it to array
    projects.push(new Project(pjtname.slice(0,1).toUpperCase()+pjtname.slice(1)))
    

}

function displayProjectInput(value) {
    // Take input value and render it on screen
    let html = `<li class="project--item">${value.slice(0,1).toUpperCase()+value.slice(1)}</li>`
    projectList.insertAdjacentHTML('beforeend', html)   
    // const li = document.createElement('li')
    // li.setAttribute('class', 'project--item')
    // li.innerHTML = value.slice(0, 1).toUpperCase() + value.slice(1) 
    // projectList.appendChild(li)
}


function findProject() {
    
    const projectItemAll = document.querySelectorAll('.project--item')
    // Find a project that contains 'active' class (=clicked by user)
        const activeProject = [...projectItemAll]
        .find(project => project.classList.contains('active')).textContent

    // Find a exact data in 'proejcts' array that matches clicked project
        const activeProjectData = projects
        .find(project => project.name === activeProject).task
    // Return an object that contains both the project element and project data
    return {
        element: activeProject,
        data: activeProjectData
    };
}

function createNewTask(taskname) {
    // // Find a project that contains 'active' class (=clicked by user)
    // const activeProject = [...projectItemAll]
    //     .find(project => project.classList.contains('active')).textContent
    // // Find a exact data in 'proejcts' array that matches clicked project
    // const activeProjectData = projects
    //     .find(project => project.name === activeProject).task

    // Add new task in the selected project
    findProject().data.push(new Task(`${taskname.slice(0, 1).toUpperCase() + taskname.slice(1)}`))
    renderTasks();

}

function renderTasks() {

findProject().data.forEach(task => {
            let html = `
                <li class="task--item">
                    <i class="material-symbols-outlined">drag_indicator</i>
                    <input type="checkbox" class="checkbox">${task.title}
                    <div class="icons">
                        <i class="material-symbols-outlined">edit</i>
                        <i class="material-symbols-outlined">delete</i>
                    </div>
                </li>
                `
            taskList.insertAdjacentHTML('beforeend', html)
    })
}



// function renderProjectTasks() {
//     projectItemAll.forEach(item => {
//         if (item.classList.contains('active')) {
//             const selectedProject = projects.find(pjt => pjt.name === item.textContent).task
//             selectedProject.forEach(task => {
//                 let html = `
//                     <li class="task--item">
//                     <i class="material-symbols-outlined">drag_indicator</i>
//                     <input type="checkbox" class="checkbox">${task.title}
//                     <div class="icons">
//                     <i class="material-symbols-outlined">edit</i>
//                     <i class="material-symbols-outlined">delete</i>
//                     </div>
//                     </li>
//                 `
//                 taskList.insertAdjacentHTML('beforeend', html)
//             })
//         }
//     })
// }
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

function getTaskValue(e) {
    if (e.key === 'Enter') {
        createNewTask(this.value)
        this.value =''
    }
}

// const projectItemAll = document.querySelectorAll('.project--item')



//TODO find a way to render task in the right project window
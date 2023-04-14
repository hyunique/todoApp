import { projects, inactivate, activate, createNewProject} from "./project.js"
import { renderTasks } from "./task.js";
import { getProjectValue, displayProjectInput, getTaskValue } from "./dom.js";

(function app() {
    const projectList = document.querySelector('.project--list');
    const projectInput = document.querySelector('.project--input')
    const taskInput = document.querySelector('.task--input')

    createNewProject('General')
    displayProjectInput('General')
    projectList.firstElementChild.classList.add('active')
    projects.find(project => project.name === 'General').active = true;


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





//TODO local storage api
//TODO handle error when nothing is typed in input



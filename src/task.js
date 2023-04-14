import { makeUpperCase, findProject } from "./project.js";
import { displayTaskInput } from "./dom.js";


class Task{
    constructor(title, id = `T${(Date.now() + '').slice(-6)}`, finished = false) {
        this.title = title;
        this.id = id;
        this.finished = finished;
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


// save finished status in task object
function finishTaskData(e) {
    let dataFinish = findProject().data.find(task => task.id === e.target.parentElement.id );
    dataFinish.finished = dataFinish.finished ? false : true;
}


function deleteTask() {
    // Remove from DOM
    let taskDiv = this.parentNode.parentNode
    taskDiv.parentElement.removeChild(taskDiv)

    // Remove from backend data
    let dataRemove = findProject().data.find(task => task.id === taskDiv.id);
    findProject().data.pop(dataRemove)
}

export { Task, createNewTask, renderTasks, finishTaskData, deleteTask };